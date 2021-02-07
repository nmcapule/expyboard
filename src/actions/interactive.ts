import type { DragEvent, GestureEvent, Options } from '@interactjs/types';
import interact from 'interactjs';

export interface Position {
  x: number;
  y: number;
  a?: number;
  s?: number;
}

/** Combines two positions. */
export function combinePosition(base: Position, delta: Position) {
  return {
    x: base.x + delta.x,
    y: base.y + delta.y,
    a: base.a + delta.a,
    s: base.s + delta.s,
  };
}

export function transform(position: Position) {
  return [
    `translate(${position.x || 0}px, ${position.y || 0}px)`,
    `scale(${position.s || 1})`,
    `rotate(${position.a || 0}deg)`,
  ].join(' ');
}

export interface Config {
  options?: Options;
  draggable?: boolean;
  rotatable?: boolean;
  scalable?: boolean;
  deltaOnly?: boolean;
  targetSelector?: string;
  position?: Position;
}

export function interactive(node: HTMLElement, config: Config = {}) {
  node.style.touchAction = 'none';
  node.style.userSelect = 'none';

  let position: Position = config.position || { x: 0, y: 0, a: 0, s: 1 };
  let delta: Position = { x: 0, y: 0, a: 0, s: 0 };

  let target: HTMLElement = node;
  if (config.targetSelector) {
    target = document.querySelector(config.targetSelector);
  }
  function applyPosition() {
    // Skip applying position if deltaOnly is true.
    if (!config.deltaOnly) {
      position = combinePosition(position, delta);
    }
    target.style.transform = transform(position);
    target.style.webkitTransform = target.style.transform;
  }
  // Let's apply initial position.
  applyPosition();

  function updatePosition() {
    applyPosition();
    node.dispatchEvent(new CustomEvent('position', { detail: position }));
    node.dispatchEvent(new CustomEvent('delta', { detail: delta }));
  }

  function attachInteraction(node: HTMLElement, config: Config) {
    const handle = interact(node, config.options);
    if (config.draggable) {
      handle.draggable({
        listeners: {
          move: (event: DragEvent) => {
            delta = {
              x: config.draggable ? event.dx : 0,
              y: config.draggable ? event.dy : 0,
              a: 0,
              s: 0,
            };
            updatePosition();
          },
        },
      });
    }
    if (config.rotatable || config.scalable) {
      handle.gesturable({
        listeners: {
          move: (event: GestureEvent) => {
            delta = {
              x: config.draggable ? event.dx : 0,
              y: config.draggable ? event.dy : 0,
              a: config.rotatable ? event.da : 0,
              s: config.scalable ? event.ds : 0,
            };
            updatePosition();
          },
        },
      });
    }
    handle.on('tap', (event: CustomEvent) => {
      node.dispatchEvent(new CustomEvent('tap', event));
    });
    handle.on('doubletap', (event: CustomEvent) => {
      node.dispatchEvent(new CustomEvent('doubletap', event));
    });
    handle.on('hold', (event: CustomEvent) => {
      node.dispatchEvent(new CustomEvent('hold', event));
    });

    return handle;
  }

  let handle = attachInteraction(node, config);

  return {
    update(newConfig: Config) {
      if (config.position !== newConfig?.position) {
        position = config.position = newConfig.position;
        applyPosition();
      }
      // For configs that don't need reinitialization.
      if (config.deltaOnly !== newConfig.deltaOnly) {
        config = newConfig;
      }
      // Not exactly generic, but it's our only use case for now.
      // Consider using fast-deep-equals library.
      if (
        config.draggable !== newConfig.draggable ||
        config.rotatable !== newConfig.rotatable ||
        config.scalable !== newConfig.scalable
      ) {
        config = newConfig;
        handle.unset();
        handle = attachInteraction(node, config);
      }
    },
    destroy() {
      handle.unset();
    },
  };
}

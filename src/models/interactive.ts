export interface InteractivePosition {
  x: number;
  y: number;
  a: number;
  zoom?: number;
}

/** Interactive object config. */
export interface InteractiveConfig extends InteractivePosition {
  disableDrag?: boolean;
  disableZoom?: boolean;
  disableRotate?: boolean;
}

export function positionAsTransform(position: InteractivePosition) {
  return [
    `translate(${position.x || 0}px, ${position.y || 0}px)`,
    `scale(${position.zoom || 1})`,
    `rotate(${position.a || 0}deg)`,
  ].join(' ');
}

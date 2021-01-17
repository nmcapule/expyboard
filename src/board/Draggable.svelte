<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import interact from 'interactjs';
  import { v4 as uuidv4 } from 'uuid';

  import type { DraggablePosition } from './models/draggable';

  // Events.
  const EVENT_MOVE = 'move';
  const EVENT_HOVER = 'hover';
  // Event dispatch.
  const dispatch = createEventDispatcher();

  // Component UUID.
  export let uuid = uuidv4();
  // Component position.
  export let position: DraggablePosition = {
    x: 0,
    y: 0,
    a: 0,
  };
  // If component is focusable.
  export let focusable = false;
  // Zoom to adjust drag speed.
  export let zoom = 1;

  // CSS selector for the generated uuid.
  const selector = '#' + CSS.escape(uuid);
  // Target element.
  let target: HTMLElement;

  onMount(() => {
    target = document.querySelector(selector);

    // We unset first, just to be sure.
    interact(selector).unset();

    interact(selector).draggable({
      inertia: true,
      autoScroll: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
      ],
      listeners: {
        move: (event) => {
          position = {
            x: position.x + event.dx / zoom,
            y: position.y + event.dy / zoom,
            a: 0,
          };
        },
        end: (event) => {
          dispatch(EVENT_MOVE, { uuid, position });
        },
      },
    });
  });

  onDestroy(() => {
    interact(selector).unset();
  });

  function handleMouseover(event: MouseEvent) {
    dispatch(EVENT_HOVER, { uuid });
  }

  $: {
    if (target) {
      target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      target.style.webkitTransform = target.style.transform;
    }
  }
</script>

<div id={uuid} class="draggable {$$props.class}" class:focusable on:mouseover={handleMouseover}>
  <slot />
</div>

<style>
  .draggable {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.1);
    touch-action: none;
    user-select: none;

    transform: translate(0px, 0px);
    -webkit-transform: translate(0px, 0px);
  }

  .draggable.focusable:hover {
    outline: 1px dashed red;
  }
</style>

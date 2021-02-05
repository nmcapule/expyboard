<script lang="ts">
  import type { DragEvent, GestureEvent } from '@interactjs/types';
  import interact from 'interactjs';
  import { onDestroy, onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { positionAsTransform } from '../models/interactive';
  import type { InteractiveConfig } from '../models/interactive';

  // Bind me two-ways.
  export let interactive: InteractiveConfig = { x: 0, y: 0, a: 0 };
  export let targetId: string;

  const interactiveElId = `interactive-${uuidv4()}`;
  const interactiveElSelector = '#' + CSS.escape(interactiveElId);

  function attachInteraction(selector: string) {
    interact(selector)
      .draggable({
        listeners: {
          move: (event: DragEvent) => {
            interactive = {
              ...interactive,
              x: interactive.x + (interactive.disableDrag ? 0 : event.dx),
              y: interactive.y + (interactive.disableDrag ? 0 : event.dy),
            };
          },
        },
      })
      .gesturable({
        listeners: {
          move: (event: GestureEvent) => {
            interactive = {
              ...interactive,
              x: interactive.x + (interactive.disableDrag ? 0 : event.dx),
              y: interactive.y + (interactive.disableDrag ? 0 : event.dy),
              a: interactive.a + (interactive.disableRotate ? 0 : event.da),
              zoom: interactive.zoom + (interactive.disableZoom ? 0 : event.ds),
            };
          },
        },
      });
  }

  function detachInteraction(selector) {
    interact(selector).unset();
  }

  function onWheel(event: WheelEvent) {
    const adjust = (Math.log2(Math.abs(event.deltaY)) / 33) * -Math.sign(event.deltaY);
    interactive.zoom += adjust;
  }

  onMount(() => attachInteraction(interactiveElSelector));
  onDestroy(() => detachInteraction(interactiveElSelector));

  $: {
    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        target.style.transform = positionAsTransform(interactive);
        target.style.webkitTransform = target.style.transform;
      }
    }
  }
</script>

<div id={interactiveElId} class="interactive {$$props.class}" on:wheel={onWheel}>
  <slot />
</div>

<style lang="less">
  .interactive {
    position: relative;
    width: 100%;
    height: 100%;
    touch-action: none;
    user-select: none;
  }
</style>

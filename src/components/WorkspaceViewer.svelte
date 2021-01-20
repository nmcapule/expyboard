<script lang="ts">
  import type { DragEvent, GestureEvent } from '@interactjs/types';

  import interact from 'interactjs';
  import { onDestroy, onMount } from 'svelte';

  const viewerElId = 'workspace-viewer';
  const viewerElSelector = '#' + CSS.escape(viewerElId);
  let viewerEl: HTMLElement;
  let viewerState = {
    x: 0,
    y: 0,
    a: 0,
    zoom: 1,
  };

  const pannableElId = 'workspace-viewer-handler';
  const pannableElSelector = '#' + CSS.escape(pannableElId);

  onMount(() => {
    viewerEl = document.querySelector(viewerElSelector);

    interact(pannableElSelector)
      .draggable({
        listeners: {
          move: (event: DragEvent) => {
            viewerState = {
              ...viewerState,
              x: viewerState.x + event.dx,
              y: viewerState.y + event.dy,
            };
          },
        },
      })
      .gesturable({
        listeners: {
          move: (event: GestureEvent) => {
            viewerState = {
              ...viewerState,
              x: viewerState.x + event.dx,
              y: viewerState.y + event.dy,
              a: viewerState.a + event.da,
              zoom: viewerState.zoom + event.ds,
            };
          },
        },
      });
  });

  onDestroy(() => {
    interact(pannableElSelector).unset();
  });

  function handleMouseWheel(event: WheelEvent) {
    const adjust = (Math.log2(Math.abs(event.deltaY)) / 33) * -Math.sign(event.deltaY);
    viewerState.zoom += adjust;
  }

  $: {
    if (viewerEl) {
      viewerEl.style.transform = [
        `translate(${viewerState.x}px, ${viewerState.y}px)`,
        `scale(${viewerState.zoom})`,
        `rotate(${viewerState.a}deg)`,
      ].join(' ');
      viewerEl.style.webkitTransform = viewerEl.style.transform;
    }
  }
</script>

<div class="workspace-viewer {$$props.class}">
  <div id={viewerElId}>Hola world</div>
  <div id={pannableElId} class="overlay" on:wheel={handleMouseWheel} />
</div>

<style lang="less">
  .workspace-viewer {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    background-size: 20px 20px;
    background-image: linear-gradient(to right, var(--color-dark-snow) 1px, transparent 1px),
      linear-gradient(to bottom, var(--color-dark-snow) 1px, transparent 1px);
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    > .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      touch-action: none;
      user-select: none;
    }
  }
</style>

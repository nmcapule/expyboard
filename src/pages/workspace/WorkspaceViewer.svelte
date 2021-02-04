<script lang="ts">
  import type { DragEvent, GestureEvent } from '@interactjs/types';

  import interact from 'interactjs';
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import ContentEditable from '../../components/ContentEditable.svelte';
  import type { NodeView, ViewerConfig } from '../../models/workspace';
  import { focusedNodes } from './workspace.store';

  // Dispatcher.
  const dispatch = createEventDispatcher();

  // Inputs.
  export let viewer: ViewerConfig = { x: 0, y: 0, a: 0, zoom: 1 };
  export let nodes: NodeView[] = [];

  const viewerElId = 'workspace-viewer';
  const viewerElSelector = '#' + CSS.escape(viewerElId);
  let viewerEl: HTMLElement;

  const pannableElId = 'workspace-viewer-handler';
  const pannableElSelector = '#' + CSS.escape(pannableElId);

  function attachInteraction(selector: string) {
    interact(selector)
      .draggable({
        listeners: {
          move: (event: DragEvent) => {
            viewer = {
              ...viewer,
              x: viewer.x + (viewer.disableDrag ? 0 : event.dx),
              y: viewer.y + (viewer.disableDrag ? 0 : event.dy),
            };
            dispatch('viewer', viewer);
          },
        },
      })
      .gesturable({
        listeners: {
          move: (event: GestureEvent) => {
            viewer = {
              ...viewer,
              x: viewer.x + (viewer.disableDrag ? 0 : event.dx),
              y: viewer.y + (viewer.disableDrag ? 0 : event.dy),
              a: viewer.a + (viewer.disableRotate ? 0 : event.da),
              zoom: viewer.zoom + (viewer.disableZoom ? 0 : event.ds),
            };
            dispatch('viewer', viewer);
          },
        },
      });
  }

  function detachInteraction(selector) {
    interact(selector).unset();
  }

  onMount(() => {
    viewerEl = document.querySelector(viewerElSelector);
    attachInteraction(pannableElSelector);
  });

  onDestroy(() => {
    detachInteraction(pannableElSelector);
  });

  function focus(node: NodeView) {
    dispatch('focus', node);
  }

  function edit(node: NodeView) {
    dispatch('edit', node);
  }

  function handleMouseWheel(event: WheelEvent) {
    const adjust = (Math.log2(Math.abs(event.deltaY)) / 33) * -Math.sign(event.deltaY);
    viewer.zoom += adjust;
  }

  function positionAsTransform(position) {
    return [
      `translate(${position.x || 0}px, ${position.y || 0}px)`,
      `scale(${position.zoom || 1})`,
      `rotate(${position.a || 0}deg)`,
    ].join(' ');
  }

  $: {
    if (viewerEl) {
      viewerEl.style.transform = positionAsTransform(viewer);
      viewerEl.style.webkitTransform = viewerEl.style.transform;
    }
  }
</script>

<div
  id={pannableElId}
  class="workspace-viewer -gesturable {$$props.class}"
  on:wheel={handleMouseWheel}
>
  <div id={viewerElId}>
    {#each nodes as node}
      <div
        class="overlay node"
        class:-focused={$focusedNodes.has(node.post.id)}
        style="transform:{positionAsTransform(node)}"
        on:click={() => focus(node)}
        on:dblclick={() => edit(node)}
      >
        <ContentEditable readOnly={true}>
          {JSON.stringify(node.post, null, 2)}
        </ContentEditable>
      </div>
    {/each}
  </div>
  <div class="overlay"><slot /></div>
</div>

<style lang="less">
  .workspace-viewer {
    max-width: 100%;
    max-height: 100%;
    background-size: 20px 20px;
    background-image: linear-gradient(to right, var(--color-dark-snow) 1px, transparent 1px),
      linear-gradient(to bottom, var(--color-dark-snow) 1px, transparent 1px);
    display: flex;
    align-items: center;
    justify-content: center;

    &.-gesturable {
      width: 100%;
      height: 100%;
      touch-action: none;
      user-select: none;
    }

    .node {
      position: absolute;

      &.-focused {
        box-shadow: 0px 0px 4px var(--color-steel);
        transition: box-shadow 0.25s;
      }
    }

    > .overlay {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import Interactive from '../../components/Interactive.svelte';
  import PostRenderer from '../../components/PostRenderer.svelte';
  import { positionAsTransform } from '../../models/interactive';
  import type { InteractiveConfig } from '../../models/interactive';
  import type { NodeView } from '../../models/workspace';
  import { focusedNodes } from './workspace.store';

  // Dispatcher.
  const dispatch = createEventDispatcher();

  // Inputs.
  export let viewer: InteractiveConfig = { x: 0, y: 0, a: 0, zoom: 1 };
  export let nodes: NodeView[] = [];

  const viewerId = `viewer-${uuidv4()}`;

  function focus(node: NodeView) {
    dispatch('focus', node);
  }

  function edit(node: NodeView) {
    dispatch('edit', node);
  }
</script>

<Interactive class="workspace-viewer {$$props.class}" interactive={viewer} targetId={viewerId}>
  <div id={viewerId}>
    {#each nodes as node}
      <div
        class="overlay node"
        class:-focused={$focusedNodes.has(node.post.id)}
        style="transform:{positionAsTransform(node)}"
        on:click={() => focus(node)}
        on:dblclick={() => edit(node)}
      >
        <PostRenderer readOnly={true} post={node.post} />
      </div>
    {/each}
  </div>
  <div class="overlay"><slot /></div>
</Interactive>

<style lang="less">
  :global(.workspace-viewer) {
    max-width: 100%;
    max-height: 100%;
    background-size: 20px 20px;
    background-image: linear-gradient(to right, var(--color-dark-snow) 1px, transparent 1px),
      linear-gradient(to bottom, var(--color-dark-snow) 1px, transparent 1px);
    display: flex;
    align-items: center;
    justify-content: center;

    .node {
      position: absolute;

      &.-focused::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-image: linear-gradient(90deg, var(--color-dark-green) 50%, transparent 50%),
          linear-gradient(90deg, var(--color-dark-green) 50%, transparent 50%),
          linear-gradient(0deg, var(--color-dark-green) 50%, transparent 50%),
          linear-gradient(0deg, var(--color-dark-green) 50%, transparent 50%);
        background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
        background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
        background-position: left top, right bottom, left bottom, right top;
        animation: border-dance 1s infinite linear;
      }
      @keyframes border-dance {
        0% {
          background-position: left top, right bottom, left bottom, right top;
        }
        100% {
          background-position: left 15px top, right 15px bottom, left bottom 15px, right top 15px;
        }
      }
    }

    > .overlay {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>

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
  @import '../../styles/mixins.less';

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

      &.-focused {
        .animated-border();
      }
    }

    > .overlay {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>

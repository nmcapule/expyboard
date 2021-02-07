<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { interactive, transform } from '../../actions/interactive';
  import type { Position } from '../../actions/interactive';
  import PostRenderer from '../../components/PostRenderer.svelte';
  import type { NodeView } from '../../models/workspace';
  import { focusedNodes } from './workspace.store';

  // Dispatcher.
  const dispatch = createEventDispatcher();

  // Inputs.
  export let viewer: Position = { x: 0, y: 0, a: 0, s: 1 };
  export let nodes: NodeView[] = [];

  const viewerId = `viewer-${uuidv4()}`;
  const viewerSelector = '#' + CSS.escape(viewerId);

  function focus(node: NodeView) {
    dispatch('focus', node);
  }

  function edit(node: NodeView) {
    dispatch('edit', node);
  }
</script>

<div
  use:interactive={{
    position: viewer,
    draggable: true,
    rotatable: true,
    scalable: true,
    targetSelector: viewerSelector,
  }}
  on:position={(event) => (viewer = event.detail)}
  class="workspace-viewer {$$props.class}"
>
  <div id={viewerId}>
    {#each nodes as node}
      <div
        class="overlay node"
        class:-focused={$focusedNodes.has(node.post.id)}
        use:interactive={{ position: node }}
        on:tap={() => focus(node)}
        on:doubletap={() => edit(node)}
      >
        <PostRenderer readOnly={true} post={node.post} />
      </div>
    {/each}
  </div>
  <div class="overlay"><slot /></div>
</div>

<style lang="less">
  @import '../../styles/mixins.less';

  :global(.workspace-viewer) {
    .background-grid();

    max-width: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .node {
      position: absolute;

      &.-focused {
        .animated-border(var(--color-steel));
      }
    }

    > .overlay {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>

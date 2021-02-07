<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { combinePosition, interactive } from '../../actions/interactive';
  import type { Position } from '../../actions/interactive';
  import PostRenderer from '../../components/PostRenderer.svelte';
  import type { NodeView } from '../../models/workspace';
  import { focusedNodes, nodes, viewer } from './workspace.store';

  // Dispatcher.
  const dispatch = createEventDispatcher();

  const viewerId = `viewer-${uuidv4()}`;
  const viewerSelector = '#' + CSS.escape(viewerId);

  function resetViewer() {
    viewer.set({ x: 0, y: 0, a: 0, s: 1 });
  }

  function focus(node: NodeView) {
    dispatch('focus', node);
  }

  function edit(node: NodeView) {
    dispatch('edit', node);
  }

  function deltaPosition(event: CustomEvent<Position>) {
    if ($focusedNodes?.size) {
      nodes.set(
        $nodes.map((node) => {
          if (!$focusedNodes.has(node.post.id)) {
            return node;
          }
          return {
            ...node,
            x: node.x + event.detail.x / $viewer.s,
            y: node.y + event.detail.y / $viewer.s,
            a: node.a + event.detail.a,
          };
        }),
      );
    } else {
      viewer.set(combinePosition($viewer, event.detail));
    }
  }

  function tapWorkspace(event: CustomEvent) {
    focus(null);
  }

  function tapNode(event: CustomEvent, node: NodeView) {
    focus(node);
  }

  function doubleTapNode(event: CustomEvent, node: NodeView) {
    edit(node);
  }
</script>

<div
  use:interactive={{
    position: $viewer,
    draggable: true,
    rotatable: $focusedNodes?.size > 0,
    scalable: true,
    deltaOnly: true,
    targetSelector: viewerSelector,
  }}
  on:delta={deltaPosition}
  class="workspace-viewer {$$props.class}"
>
  <div class="overlay -full" use:interactive on:tap={tapWorkspace} on:doubletap={resetViewer} />
  <div id={viewerId}>
    {#each $nodes as node}
      <div
        class="overlay node"
        class:-focused={$focusedNodes.has(node.post.id)}
        use:interactive={{ position: node }}
        on:tap={(event) => tapNode(event, node)}
        on:doubletap={(event) => doubleTapNode(event, node)}
      >
        {#if $focusedNodes.has(node.post.id)}
          <div class="annotation">{node.post.title}</div>
        {/if}
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
        z-index: 100;
      }

      > .annotation {
        position: absolute;
        top: -14px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--color-steel);
        z-index: 100;
      }
    }

    > .overlay {
      position: absolute;
      top: 0;
      left: 0;

      &.-full {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

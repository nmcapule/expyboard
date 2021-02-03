<script lang="ts">
  import { Button, Fab, FabButton, FabButtons, Icon, Page } from 'framework7-svelte';
  import WorkspaceExplorer from './workspace/WorkspaceExplorer.svelte';
  import WorkspaceViewer from './workspace/WorkspaceViewer.svelte';
  import { nodes, viewer } from './workspace/workspace.store';
  import { WorkspaceMode } from './workspace/workspace.constants';
  import PostEditor from './workspace/PostEditor.svelte';

  import type { NodeView } from '../models/workspace';
  import type { Post } from '../models/post';

  let showExplorer = true;
  let mode = WorkspaceMode.MODE_VIEWER;
  let post: Post;

  function addNode() {
    nodes.update((n) => [
      ...n,
      {
        x: -$viewer.x / $viewer.zoom,
        y: -$viewer.y / $viewer.zoom,
        a: 0,
        post: 'ola mutherfuckers',
      },
    ]);
  }

  function resetView() {
    viewer.update((n) => ({ x: 0, y: 0, a: 0, zoom: 1 }));
  }

  function focus(event: CustomEvent<NodeView>) {
    mode = WorkspaceMode.MODE_EDIT;
    post = event.detail.post;
  }
</script>

<Page>
  <div class="workspace-container display-flex">
    <WorkspaceExplorer
      viewer={$viewer}
      nodes={$nodes}
      class={!showExplorer ? 'collapsed' : 'expanded'}
      on:focus={focus}
    />

    {#if mode === WorkspaceMode.MODE_VIEWER}
      <WorkspaceViewer class="workspace-content" bind:viewer={$viewer} nodes={$nodes}>
        <Button
          class="collapse-button"
          raised
          round
          color="white"
          on:click={() => (showExplorer = !showExplorer)}
        >
          {#if showExplorer}
            <Icon material="arrow_left" />
          {:else}
            <Icon material="arrow_right" />
          {/if}
        </Button>
      </WorkspaceViewer>
      <Fab position="right-bottom">
        <Icon material="add" />
        <Icon material="close" />
        <FabButtons position="left">
          <FabButton fabClose on:click={addNode}>Add</FabButton>
          <FabButton fabClose on:click={resetView}>Reset</FabButton>
        </FabButtons>
      </Fab>
    {:else if mode === WorkspaceMode.MODE_EDIT}
      <PostEditor class="workspace-content" {post} />
    {/if}
  </div>
</Page>

<style lang="less">
  .workspace-container {
    --explorer-width: 320px;

    height: 100%;

    // Make the workspace explorer component elevated.
    > :global(.workspace-explorer) {
      z-index: 1000;
      width: var(--explorer-width);
      min-width: var(--explorer-width);
    }

    > :global(.workspace-content) {
      flex-grow: 1;
      overflow: hidden;
      position: relative;
    }
  }

  .workspace-container > :global(.collapsed) {
    pointer-events: none;
    opacity: 0;
    width: 0 !important;
    min-width: 0 !important;
    transition: width 0.25s, min-width 0.25s, opacity 0.25s;
  }

  .workspace-container > :global(.expanded) {
    transition: width 0.25s, opacity 0.25s;
  }

  .workspace-container :global(.collapse-button) {
    background-color: var(--color-white);
    color: var(--color-steel);
    width: 40px;
    height: 40px;
    margin: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

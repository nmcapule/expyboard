<script lang="ts">
  import { Button, Fab, FabButton, FabButtons, Icon, Page } from 'framework7-svelte';
  import { v4 as uuidv4 } from 'uuid';

  import WorkspaceExplorer from './workspace/WorkspaceExplorer.svelte';
  import WorkspaceViewer from './workspace/WorkspaceViewer.svelte';
  import { focusedNodes, nodes, viewer } from './workspace/workspace.store';
  import { WorkspaceMode } from './workspace/workspace.constants';
  import PostEditor from './workspace/PostEditor.svelte';
  import type { NodeView } from '../models/workspace';
  import { PostType } from '../models/post';
  import type { Post } from '../models/post';

  let showExplorer = true;
  let mode = WorkspaceMode.MODE_VIEWER;
  let post: Post;

  function addNode() {
    nodes.update((n) => [
      ...n,
      {
        x: -$viewer.x / $viewer.s,
        y: -$viewer.y / $viewer.s,
        a: 0,
        post: {
          id: uuidv4(),
          title: 'ola momomo',
          type: PostType.BASIC_TEXT,
          data: {},
        },
      },
    ]);
  }

  function resetView() {
    viewer.update((n) => ({ x: 0, y: 0, a: 0, zoom: 1 }));
  }

  function focus(event: CustomEvent<NodeView>) {
    const node = event.detail;
    if (node) {
      focusedNodes.set(new Set([event.detail.post.id]));
    } else {
      focusedNodes.set(new Set());
    }
  }

  function edit(event: CustomEvent<NodeView>) {
    mode = WorkspaceMode.MODE_EDIT;
    post = event.detail.post;

    focusedNodes.set(new Set([event.detail.post.id]));
  }

  function closeEditor() {
    mode = WorkspaceMode.MODE_VIEWER;

    focusedNodes.set(new Set());
  }

  function handleKeydown(event: KeyboardEvent) {
    switch (event.code) {
      case 'Escape':
        closeEditor();
        event.preventDefault();
        break;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<Page>
  <div class="workspace-container display-flex">
    <Button
      class="collapse-button {!showExplorer ? 'collapsed' : 'expanded'}"
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

    <WorkspaceExplorer
      viewer={$viewer}
      nodes={$nodes}
      class={!showExplorer ? 'collapsed' : 'expanded'}
      on:focus={focus}
      on:edit={edit}
    />

    {#if mode === WorkspaceMode.MODE_VIEWER}
      <WorkspaceViewer
        class="workspace-content"
        bind:viewer={$viewer}
        nodes={$nodes}
        on:focus={focus}
        on:edit={edit}
      />
      <Fab position="right-bottom">
        <Icon material="add" />
        <Icon material="close" />
        <FabButtons position="left">
          <FabButton fabClose on:click={addNode}>Add</FabButton>
          <FabButton fabClose on:click={resetView}>Reset</FabButton>
        </FabButtons>
      </Fab>
    {:else if mode === WorkspaceMode.MODE_EDIT}
      <PostEditor class="workspace-content" {post} on:close={closeEditor} />
    {/if}
  </div>
</Page>

<style lang="less">
  .workspace-container {
    --explorer-width: 320px;

    height: 100%;
    position: relative;

    // Make the workspace explorer component elevated.
    > :global(.workspace-explorer) {
      z-index: 1000;
      width: var(--explorer-width);
      min-width: var(--explorer-width);
    }

    > :global(.workspace-explorer.collapsed) {
      pointer-events: none;
      opacity: 0;
      width: 0 !important;
      min-width: 0 !important;
      transition: width 0.25s, min-width 0.25s, opacity 0.25s;
    }

    > :global(.workspace-explorer.expanded) {
      transition: width 0.25s, min-width 0.25s, opacity 0.25s;
    }

    > :global(.workspace-content) {
      flex-grow: 1;
      overflow: hidden;
      position: relative;
    }

    :global(.collapse-button) {
      position: absolute;
      z-index: 1000;
      left: var(--explorer-width);

      background-color: var(--color-white);
      color: var(--color-steel);
      width: 40px;
      height: 40px;
      margin: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :global(.collapse-button.collapsed) {
      left: 0;
      transition: left 0.25s;
    }

    :global(.collapse-button.expanded) {
      transition: left 0.25s;
    }
  }
</style>

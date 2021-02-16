<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { f7, Button, Fab, Icon, Page } from 'framework7-svelte';
  import { v4 as uuidv4 } from 'uuid';
  import localforage from 'localforage';

  import WorkspaceExplorer from './workspace/WorkspaceExplorer.svelte';
  import WorkspaceViewer from './workspace/WorkspaceViewer.svelte';
  import { focusedNodes, nodes, viewer } from './workspace/workspace.store';
  import { WorkspaceMode } from './workspace/workspace.constants';
  import PostEditor from './workspace/PostEditor.svelte';
  import type { NodeView } from '../models/workspace';
  import { PostType } from '../models/post';
  import type { Post } from '../models/post';

  const workspaceId = 'default-workspace';

  let showExplorer = false;
  let mode = WorkspaceMode.MODE_VIEWER;
  let post: Post;

  const detach = nodes.subscribe(async (v) => {
    await localforage.setItem(workspaceId, v);
  });

  onMount(async () => {
    nodes.set((await localforage.getItem(workspaceId)) || []);
  });

  onDestroy(detach);

  function addNode() {
    const uuid = uuidv4();

    nodes.update((n) => [
      ...n,
      {
        x: -$viewer.x / $viewer.s,
        y: -$viewer.y / $viewer.s,
        a: 0,
        post: {
          id: uuid,
          title: uuid.slice(0, 12),
          type: PostType.BASIC_TEXT,
          data: {},
        },
      },
    ]);
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

  function remove(event: CustomEvent<NodeView>) {
    post = event.detail.post;

    focusedNodes.set(new Set());
    nodes.update((nodes) => nodes.filter((node) => node.post.id !== post.id));
  }

  function hold(event: CustomEvent<NodeView>) {
    const node = event.detail;

    f7.dialog
      .create({
        title: node.post.title,
        buttons: [
          {
            text: 'Edit Node',
            onClick: (dialog, event) => {
              edit(new CustomEvent('edit', { detail: node }));
            },
          },
          {
            text: 'Delete Node',
            onClick: (dialog, event) => {
              remove(new CustomEvent('remove', { detail: node }));
            },
          },
        ],
        verticalButtons: true,
      })
      .open();
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
      on:hold={hold}
    />

    {#if mode === WorkspaceMode.MODE_VIEWER}
      <WorkspaceViewer class="workspace-content" on:focus={focus} on:edit={edit} on:hold={hold} />
      <Fab position="right-bottom" on:click={addNode}>
        <Icon material="add" />
      </Fab>
    {:else if mode === WorkspaceMode.MODE_EDIT}
      <PostEditor class="workspace-content" {post} on:close={closeEditor} />
    {/if}
  </div>
</Page>

<style lang="less">
  @import '../styles/mixins.less';

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

    > :global(.collapse-button) {
      position: absolute;
      z-index: 1000;
      left: var(--explorer-width);

      .extend-f7-button();
    }

    > :global(.collapse-button.collapsed) {
      left: 0;
      transition: left 0.25s;
    }

    > :global(.collapse-button.expanded) {
      transition: left 0.25s;
    }
  }
</style>

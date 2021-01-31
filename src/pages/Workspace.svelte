<script lang="ts">
  import { Button, Fab, FabButton, FabButtons, Icon, Page } from 'framework7-svelte';
  import type { NodeView, ViewerConfig } from '../models/workspace';
  import WorkspaceExplorer from './workspace/WorkspaceExplorer.svelte';
  import WorkspaceViewer from './workspace/WorkspaceViewer.svelte';

  let showExplorer = true;
  let viewer: ViewerConfig = { x: 0, y: 0, a: 0, zoom: 1 };
  let nodes: NodeView[] = [
    { x: 0, y: 0, a: 0, data: 'hello1' },
    { x: 0, y: 100, a: 0, data: 'hello2' },
    { x: 100, y: 0, a: 0, data: 'hello3' },
  ];

  function resetView() {
    viewer = { x: 0, y: 0, a: 0, zoom: 1 };
  }
</script>

<Page>
  <div class="workspace-container display-flex">
    <WorkspaceExplorer {viewer} {nodes} class={!showExplorer ? 'collapsed' : 'expanded'} />
    <WorkspaceViewer {viewer} {nodes}>
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
        <FabButton fabClose>Add</FabButton>
        <FabButton fabClose on:click={resetView}>Reset</FabButton>
      </FabButtons>
    </Fab>
  </div>
</Page>

<style lang="less">
  .workspace-container {
    height: 100%;

    // Make the workspace explorer component elevated.
    > :global(.workspace-explorer) {
      z-index: 1000;
    }
  }

  .workspace-container > :global(.collapsed) {
    pointer-events: none;
    opacity: 0;
    width: 0 !important;
    transition: width 0.25s, opacity 0.25s;
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

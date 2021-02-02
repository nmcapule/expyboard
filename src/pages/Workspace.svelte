<script lang="ts">
  import { Button, Fab, FabButton, FabButtons, Icon, Page } from 'framework7-svelte';
  import WorkspaceExplorer from './workspace/WorkspaceExplorer.svelte';
  import WorkspaceViewer from './workspace/WorkspaceViewer.svelte';
  import { nodes, viewer } from './workspace/workspace.store';

  let showExplorer = true;

  function addNode() {
    nodes.update((n) => [
      ...n,
      {
        x: -$viewer.x / $viewer.zoom,
        y: -$viewer.y / $viewer.zoom,
        a: 0,
        data: 'ola mutherfuckers',
      },
    ]);
  }

  function resetView() {
    viewer.update((n) => ({ x: 0, y: 0, a: 0, zoom: 1 }));
  }
</script>

<Page>
  <div class="workspace-container display-flex">
    <WorkspaceExplorer
      viewer={$viewer}
      nodes={$nodes}
      class={!showExplorer ? 'collapsed' : 'expanded'}
    />
    <WorkspaceViewer bind:viewer={$viewer} nodes={$nodes}>
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

<script lang="ts">
  import { Button, Icon, Page } from 'framework7-svelte';
  import SpaceExplorer from '../components/SpaceExplorer.svelte';
  import WorkspaceViewer from '../components/WorkspaceViewer.svelte';

  let showExplorer = true;
</script>

<Page>
  <div class="workspace-container display-flex">
    <SpaceExplorer class={!showExplorer ? 'collapsed' : 'expanded'} />
    <WorkspaceViewer>
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
  </div>
</Page>

<style lang="less">
  .workspace-container {
    height: 100%;
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

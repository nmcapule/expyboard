<script lang="ts">
  import { Page } from 'framework7-svelte';
  import SpaceExplorer from '../components/SpaceExplorer.svelte';
  import WorkspaceViewer from '../components/WorkspaceViewer.svelte';
</script>

<Page>
  <div class="workspace-container display-flex">
    <SpaceExplorer />
    <WorkspaceViewer />
  </div>
</Page>

<style lang="less">
  .workspace-container {
    height: 100%;
  }
</style>

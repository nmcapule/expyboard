<script lang="ts">
  import { Page } from 'framework7-svelte';
  import SpaceExplorer from '../components/SpaceExplorer.svelte';
  import WorkspaceViewer from '../components/WorkspaceViewer.svelte';
</script>

<Page>
  <div class="workspace-container d-flex h-100">
    <SpaceExplorer />
    <WorkspaceViewer />
  </div>
</Page>

<style lang="less">
</style>

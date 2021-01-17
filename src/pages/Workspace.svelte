<script lang="ts">
  import { Page } from 'framework7-svelte';
  import Draggable from '../board/Draggable.svelte';
  import SpaceExplorer from '../components/SpaceExplorer.svelte';
</script>

<Page>
  <div class="workspace-container d-flex h-100">
    <SpaceExplorer />
    <div class="content">
      <Draggable>I'm a content</Draggable>
    </div>
  </div>
</Page>

<style lang="less">
  .content {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    background-size: 20px 20px;
    background-image: linear-gradient(to right, var(--color-dark-snow) 1px, transparent 1px),
      linear-gradient(to bottom, var(--color-dark-snow) 1px, transparent 1px);
    overflow: auto;
  }
</style>

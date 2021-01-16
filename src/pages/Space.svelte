<script lang="ts">
  import { Page } from 'framework7-svelte';
  import type { Router } from 'framework7/modules/router/router';
  import SpaceExplorer from '../components/SpaceExplorer.svelte';

  export let f7router: Router.Router;
</script>

<Page>
  <div class="d-flex h-100">
    <SpaceExplorer />
    <div class="content" />
  </div>
</Page>

<style lang="less">
  .content {
    width: 100%;
    background-size: 20px 20px;
    background-image: linear-gradient(to right, var(--color-dark-snow) 1px, transparent 1px),
      linear-gradient(to bottom, var(--color-dark-snow) 1px, transparent 1px);
  }
</style>

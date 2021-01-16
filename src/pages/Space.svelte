<script lang="ts">
  import { Page, Link, Navbar, Toolbar } from 'framework7-svelte';
  import type { Router } from 'framework7/modules/router/router';

  export let f7router: Router.Router;
</script>

<Page>
  <Navbar title="Spaces" />
  <Toolbar bottom>
    <Link onClick={() => f7router.navigate('/')}>Link 1</Link>
    <Link>Link 2</Link>
  </Toolbar>
  <div>Hello</div>
</Page>

<style lang="less">
</style>

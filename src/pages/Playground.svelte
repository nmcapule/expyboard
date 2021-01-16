<script lang="ts">
  import { Page, Navbar, Toolbar, Link } from 'framework7-svelte';
  import type { Router } from 'framework7/modules/router/router';

  import App from '../board/App.svelte';

  export let f7router: Router.Router;
</script>

<Page>
  <!-- Top Navbar -->
  <Navbar title="Awesome App" />
  <!-- Toolbar -->
  <Toolbar bottom>
    <Link onClick={() => f7router.navigate('/space/')}>Link 1</Link>
    <Link>Link 2</Link>
  </Toolbar>
  <!-- Page Content -->
  <App />
</Page>

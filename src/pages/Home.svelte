<script lang="ts">
  import { Page, Navbar, Toolbar, Link } from 'framework7-svelte';
</script>

<Page>
  <!-- Top Navbar -->
  <Navbar title="Awesome App" />
  <!-- Toolbar -->
  <Toolbar bottom>
    <Link>Link 1</Link>
    <Link>Link 2</Link>
  </Toolbar>
  <!-- Page Content -->
  <p>Page content goes here</p>
  <Link href="/about/">About App</Link>
</Page>

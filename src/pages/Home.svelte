<script>
  import { onMount } from 'svelte';
  import { Page, Link } from 'framework7-svelte';

  // Router component will receive f7router prop with current Router instance
  export let f7router;
  // Router component will receive f7route prop with current route data
  export let f7route;

  onMount(() => {
    // output current route data
    console.log(f7route); // -> { url: '/foo/', query: { id: 3 }, ... }
  });
</script>

<Page>
  ...
  <Link onClick={() => f7router.navigate('/about/')}>About</Link>
  <Link onClick={() => f7router.back()}>Go Back</Link>
</Page>

<script lang="ts">
  import { App, View } from 'framework7-svelte';
  import type { Framework7Params } from 'framework7/components/app/app-class';

  import routes from './routes';

  const f7params: Framework7Params = {
    name: 'Experimental Board',
    theme: 'auto', // shit doesn't work.
    routes,
  };
</script>

<App {...f7params}>
  <View main pushState url="/" masterDetailBreakpoint={800} />
</App>

<style lang="less">
</style>

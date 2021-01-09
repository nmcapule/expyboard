<script lang="ts">
  import { App, View } from 'framework7-svelte';
  import type { Framework7Params } from 'framework7/components/app/app-class';

  import routes from './routes';

  const f7params: Framework7Params = {
    name: 'Experimental Board',
    theme: 'ios',
    routes,
  };
</script>

<style lang="less">
</style>

<App {...f7params}>
  <View main={true} url="/" masterDetailBreakpoint={800} />
</App>

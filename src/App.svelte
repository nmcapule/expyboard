<script lang="ts">
  import { App, View } from 'framework7-svelte';
  import type { Framework7Parameters } from 'framework7/types';

  import routes from './routes';

  const f7params: Framework7Parameters = {
    name: 'Experimental Board',
    theme: 'auto', // Automatic theme detection
    autoDarkTheme: true, // Automatic Dark Theme
    routes,
  };
</script>

<style lang="less">
</style>

<App {...f7params}>
  <View main={true} class="safe-areas" url="/" masterDetailBreakpoint={800} />
</App>

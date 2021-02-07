<script lang="ts">
  import type { Post } from '../../models/post';
  import EjsInstance from '../EJSInstance.svelte';

  export let post: Post;
  export let readOnly = true;
</script>

<div class="basic-text">
  <EjsInstance {readOnly} bind:data={post.data} />
</div>

<style lang="less">
  .basic-text {
    min-width: 160px;
    background-color: var(--color-light-yellow);
    border-radius: 4px;
    padding: 12px;
  }
</style>

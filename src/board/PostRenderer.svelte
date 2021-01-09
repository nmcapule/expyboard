<script lang="ts">
  import Text from './posts/Text.svelte';
  import Photo from './posts/Photo.svelte';
  import type { Post } from './models/post';

  export let post: Post;
</script>

{#if post.type === 'text'}
  <Text {post} />
{:else if post.type === 'photo'}
  <Photo {post}>{post.uuid}</Photo>
{:else}
  <div>Unknown type: {post.type}</div>
{/if}

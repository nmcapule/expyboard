<script lang="ts">
  import type { Post } from '../models/post';
  import { PostType } from '../models/post';
  import BasicTextPost from './posts/BasicTextPost.svelte';

  export let post: Post;
  export let readOnly = true;
</script>

<div class="post-renderer" class:-editing={!readOnly}>
  {#if post.type === PostType.BASIC_TEXT}
    <BasicTextPost {post} {readOnly} />
  {:else if post.type === PostType.BASIC_PHOTO}
    <div>Basic Photo</div>
  {:else}
    <div>Dummy / Placeholder</div>
  {/if}
</div>

<style lang="less">
  .post-renderer {
    &.-editing {
      cursor: pointer;
    }
  }
</style>

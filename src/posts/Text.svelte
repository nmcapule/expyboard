<script lang="ts">
  import type { Post } from '../models/post';

  export let post: Post;
</script>

<style>
  .post {
    display: flex;
    flex-direction: column;
    background-color: yellow;
    padding: 10px;
    max-width: 300px;
    max-height: 300px;
  }
</style>

<div class="post">{post.data}</div>

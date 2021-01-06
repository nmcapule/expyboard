<script lang="ts">
  import type { Post } from '../models/post';

  export let post: Post;
</script>

<style>
  .post {
    display: flex;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
    flex-direction: column;
    background-color: white;
    padding: 10px;
    padding-bottom: 100px;
    max-width: 300px;
    max-height: 300px;
  }

  .post > .image {
    max-width: 300px;
    max-height: 300px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: #efefef;
  }
</style>

<div class="post">
  <img class="image" alt={post.data} src={post.data} />
  <slot />
</div>

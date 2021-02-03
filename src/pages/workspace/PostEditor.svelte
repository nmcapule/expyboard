<script lang="ts">
  import type { Post } from '../../models/post';

  export let post: Post;
</script>

<div class="post-editor {$$props.class}">
  {JSON.stringify(post)}
</div>

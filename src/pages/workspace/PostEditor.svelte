<script lang="ts">
  import ContentEditable from '../../components/ContentEditable.svelte';
  import type { Post } from '../../models/post';

  export let post: Post;
</script>

<div class="post-editor {$$props.class} flex-direction-column">
  <div>
    <ContentEditable class="editor-container" />
  </div>
</div>

<style lang="less">
  .post-editor {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-light-marvel);

    :global(.editor-container) {
      width: 200px;
      padding: 0 10px;
      background-color: var(--color-white);
      border-radius: 4px;
    }
  }
</style>

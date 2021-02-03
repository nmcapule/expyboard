<script lang="ts">
  import EditorJS from '@editorjs/editorjs';
  import Header from '@editorjs/header';
  import List from '@editorjs/list';
  import { onDestroy, onMount } from 'svelte';
  import type { Post } from '../../models/post';

  export let post: Post;

  let editor: EditorJS;

  onMount(() => {
    editor = new EditorJS({
      holder: 'editor',
      tools: {
        header: Header,
        list: List,
      },
      minHeight: 0,
    });
  });

  onDestroy(() => {
    editor.destroy();
  });
</script>

<div class="post-editor {$$props.class}">
  <div class="editor-container" id="editor" />
</div>

<style lang="less">
  .post-editor {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-light-marvel);
  }

  .editor-container {
    width: 400px;
    padding: 0 10px;
    background-color: var(--color-white);
    border-radius: 4px;
  }
</style>

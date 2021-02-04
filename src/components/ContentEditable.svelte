<script lang="ts">
  import EditorJS, { OutputData } from '@editorjs/editorjs';
  import Header from '@editorjs/header';
  import List from '@editorjs/list';
  import { onDestroy, onMount } from 'svelte';

  import { v4 as uuidv4 } from 'uuid';

  // Note that there's a non-blocking (?) bug with rendering multiple editors.
  // https://github.com/codex-team/editor.js/issues/1503

  export let data: OutputData = {
    blocks: [{ type: 'paragraph', data: { text: 'Placeholder' } }],
  };
  export let readOnly = false;

  const elementId = uuidv4();
  const elementIdSelector = '#' + CSS.escape(elementId);

  let editor: EditorJS;

  onMount(() => {
    editor?.destroy();
    editor = new EditorJS({
      holder: elementIdSelector,
      tools: {
        header: Header,
        list: List,
      },
      data,
      readOnly,
      minHeight: 0,
    });
  });

  onDestroy(() => {
    editor.destroy();
  });

  async function save() {
    const data = await editor.save();
    console.log(data);
  }
</script>

<div id={elementIdSelector} class="content-editable {$$props.class}" />

<style lang="less">
  .content-editable {
    :global(.codex-editor__redactor) {
      margin-right: 0 !important;
    }
  }
</style>

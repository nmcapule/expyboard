<script lang="ts">
  import EditorJS, { OutputData } from '@editorjs/editorjs';
  import Header from '@editorjs/header';
  import List from '@editorjs/list';
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  import { v4 as uuidv4 } from 'uuid';

  // Note that there's a non-blocking (?) bug with rendering multiple editors.
  // https://github.com/codex-team/editor.js/issues/1503

  const dispatch = createEventDispatcher();

  export let data: OutputData = {
    blocks: [{ type: 'paragraph', data: { text: 'Placeholder' } }],
  };
  export let readOnly = false;

  const elementId = uuidv4();
  const elementIdSelector = '#' + CSS.escape(elementId);

  let editor: EditorJS;

  onMount(() => {
    editor = new EditorJS({
      holder: elementIdSelector,
      tools: {
        paragraph: {
          config: { placeholder: 'Placeholder ' },
        } as any, // Needs as 'any' since missing class prop.
        header: {
          class: Header,
        },
        list: {
          class: List,
        },
      },
      data,
      readOnly,
      minHeight: 0,
      onChange: async () => {
        data = await editor.save();
        dispatch('edit', data);
      },
    });
  });

  onDestroy(() => {
    // Editor errors out if destroyed without being ready.
    editor.isReady.then(() => editor.destroy());
  });

  $: {
    editor?.readOnly?.toggle(readOnly);
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

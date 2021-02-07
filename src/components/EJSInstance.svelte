<script lang="ts">
  import EditorJS, { OutputData } from '@editorjs/editorjs';
  import Header from '@editorjs/header';
  import List from '@editorjs/list';
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  import { v4 as uuidv4 } from 'uuid';

  // Note that there's a non-blocking (?) bug with rendering multiple editors.
  // https://github.com/codex-team/editor.js/issues/1503

  const dispatch = createEventDispatcher();

  export let data: OutputData = { blocks: [] };
  export let readOnly = false;

  const elementId = uuidv4();
  const elementIdSelector = '#' + CSS.escape(elementId);

  let editor: EditorJS;

  onMount(() => {
    editor = new EditorJS({
      holder: elementIdSelector,
      tools: {
        // https://gitmemory.com/issue/codex-team/editor.js/606/481599911
        paragraph: {
          config: { placeholder: 'Placeholder ' },
        } as any, // Needs as 'any' since missing class prop.
        header: {
          class: Header,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
      },
      data,
      readOnly,
      minHeight: 0,
      onChange: async () => {
        try {
          const data = await editor.save();
          dispatch('edit', data);
        } catch (e) {
          console.warn('saved after destroying editor:', e);
        }
      },
    });
  });

  onDestroy(() => {
    // Editor errors out if destroyed without being ready.
    editor.isReady.then(() => editor.destroy());
  });

  async function render() {
    if (!editor) {
      return;
    }

    await editor.readOnly?.toggle(readOnly);
    if (data.blocks) {
      await editor.blocks?.render(data);
    }
  }

  $: if (editor) {
    editor?.isReady.then(render);
  }
  $: data && render();
</script>

<div id={elementIdSelector} class="content-editable {$$props.class}" />

<style lang="less">
  .content-editable {
    :global(.codex-editor__redactor) {
      margin-right: 0 !important;
    }
  }
</style>

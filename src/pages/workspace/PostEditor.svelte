<script lang="ts">
  import { Button, Icon } from 'framework7-svelte';
  import { createEventDispatcher } from 'svelte';
  import ContentEditable from '../../components/ContentEditable.svelte';
  import type { Post } from '../../models/post';

  const EVENT_CLOSE = 'close';

  const dispatch = createEventDispatcher();
  export let post: Post;
</script>

<div class="post-editor {$$props.class} flex-direction-column">
  <ContentEditable class="editor-container" />

  <Button class="close-button" round color="white" on:click={() => dispatch(EVENT_CLOSE)}>
    <Icon material="close" />
  </Button>
</div>

<style lang="less">
  .post-editor {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-light-marvel);

    :global(.editor-container) {
      width: 400px;
      padding: 0 10px;
      background-color: var(--color-white);
      border-radius: 4px;
    }

    :global(.close-button) {
      position: absolute;
      z-index: 1000;
      right: 0;
      top: 0;

      color: var(--color-steel);
      width: 40px;
      height: 40px;
      margin: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>

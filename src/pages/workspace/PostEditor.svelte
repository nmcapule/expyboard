<script lang="ts">
  import { Button, Icon } from 'framework7-svelte';
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import ContentEditable from '../../components/ContentEditable.svelte';
  import Interactive from '../../components/Interactive.svelte';
  import PostRenderer from '../../components/PostRenderer.svelte';
  import type { Post } from '../../models/post';

  const EVENT_CLOSE = 'close';

  const dispatch = createEventDispatcher();
  export let post: Post;

  const id = uuidv4();
</script>

<Interactive class="post-editor flex-direction-column {$$props.class}" targetId={id}>
  <div {id}>
    <PostRenderer {post} readOnly={false} />
  </div>
  <Button class="close-button" round color="white" on:click={() => dispatch(EVENT_CLOSE)}>
    <Icon material="close" />
  </Button>
</Interactive>

<style lang="less">
  :global(.post-editor) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-light-marvel);

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

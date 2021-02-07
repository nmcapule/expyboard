<script lang="ts">
  import { Button, Icon } from 'framework7-svelte';
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { interactive } from '../../actions/interactive';
  import PostRenderer from '../../components/PostRenderer.svelte';
  import type { Post } from '../../models/post';

  const EVENT_CLOSE = 'close';

  const dispatch = createEventDispatcher();
  export let post: Post;

  const id = uuidv4();
  const selector = '#' + CSS.escape(id);
</script>

<div
  use:interactive={{
    draggable: true,
    rotatable: true,
    scalable: true,
    targetSelector: selector,
  }}
  class="post-editor flex-direction-column {$$props.class}"
>
  <div {id}>
    <PostRenderer {post} readOnly={false} />
  </div>
  <Button class="close-button" round color="white" on:click={() => dispatch(EVENT_CLOSE)}>
    <Icon material="close" />
  </Button>
</div>

<style lang="less">
  @import '../../styles/mixins.less';

  :global(.post-editor) {
    .background-grid(var(--color-white), 8px, var(--color-dark-snow));

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

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

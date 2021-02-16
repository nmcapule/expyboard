<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Icon } from 'framework7-svelte';
  import type { Post } from '../models/post';
  import { PostType } from '../models/post';
  import BasicTextPost from './posts/BasicTextPost.svelte';
  import { interactive } from '../actions/interactive';
  import type { Position } from '../actions/interactive';

  const dispatch = createEventDispatcher();

  export let post: Post;
  export let readOnly = true;
  export let focused = false;

  function deltaSize(event: CustomEvent<Position>) {
    console.log('size', event.detail);
  }

  function deltaRotation(event: CustomEvent<Position>) {
    dispatch('position', { a: -event.detail.x, x: 0, y: 0, s: 0 });
  }

  function deltaPosition(event: CustomEvent<Position>) {
    dispatch('position', event.detail);
  }
</script>

{#if focused}
  <div class="post-title">{post.title}</div>
{/if}
<div class="post-renderer" class:-editing={!readOnly} class:-focused={focused}>
  {#if post.type === PostType.BASIC_TEXT}
    <BasicTextPost {post} {readOnly} on:edit />
  {:else if post.type === PostType.BASIC_PHOTO}
    <div>Basic Photo</div>
  {:else}
    <div>Dummy / Placeholder</div>
  {/if}
</div>
{#if focused}
  <div class="post-controls">
    <div class="control-button -disabled">
      <Icon size="12" material="settings_overscan" />
    </div>
    <div class="control-button">
      <Icon size="12" material="cached" />
      <div
        class="overlay"
        use:interactive={{ draggable: true, deltaOnly: true }}
        on:delta={deltaRotation}
      />
    </div>
    <div class="control-button">
      <Icon size="12" material="pan_tool" />
      <div
        class="overlay"
        use:interactive={{ draggable: true, deltaOnly: true }}
        on:delta={deltaPosition}
      />
    </div>
  </div>
{/if}

<style lang="less">
  @import '../styles/mixins.less';

  .post-renderer {
    &.-editing {
      cursor: pointer;
    }

    &.-focused {
      .animated-border(var(--color-steel));
    }
  }

  .post-title {
    position: absolute;
    top: -20px;
  }

  .post-controls {
    --button-size: 32px;

    position: absolute;
    display: flex;
    flex-direction: row;
    right: 0;
    bottom: calc(var(--button-size) * -1.3);

    > .control-button {
      .extend-f7-button(var(--button-size), var(--color-white), var(--color-steel), 3px);
      .custom-f7-button();

      position: relative;

      &.-disabled {
        background-color: var(--color-smoke);
        border: 0;
        color: var(--color-dark-smoke);
      }
    }

    > :global(.control-button > .overlay) {
      .overlay-f7-component();
    }
  }
</style>

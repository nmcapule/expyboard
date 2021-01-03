<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Draggable from './Draggable.svelte';
  import PhotoPost from './PhotoPost.svelte';
  import type { PositionedPost } from '../models/post';

  // Events.
  const EVENT_CREATE = 'create';
  const EVENT_DELETE = 'delete';
  const EVENT_UPDATE_POSITION = 'position';
  // Event dispatch.
  const dispatch = createEventDispatcher();

  // List of input posts.
  export let posts: PositionedPost[] = [];

  let focusedElementUUID = '';

  // Tracking mouse movement.
  let mouseEvent: MouseEvent;
  function handleMousemove(event: MouseEvent) {
    mouseEvent = event;
  }

  // Handle keyboard event presses of the board.
  function handleKeypress(event: KeyboardEvent) {
    switch (event.key) {
      case 'a':
        dispatch(EVENT_CREATE, {
          data: {},
          position: {
            x: mouseEvent.offsetX,
            y: mouseEvent.offsetY,
            a: 0,
          },
        } as Partial<PositionedPost>);
        event.preventDefault();
        break;
      case 'd':
        dispatch(EVENT_DELETE, {
          uuid: focusedElementUUID,
        });
        event.preventDefault();
        break;
    }
  }

  function handleDraggableMove(event: CustomEvent) {
    const { uuid, position } = event.detail;
    // Dispatch to event.
    dispatch(EVENT_UPDATE_POSITION, { uuid, position });
  }

  function handleMouseover(event: CustomEvent) {
    focusedElementUUID = event.detail.uuid;
  }
</script>

<style>
  .board {
    background-color: rgba(100, 80, 192, 0.2);
    border: 1px solid black;
    width: 100%;
    height: 100%;
  }
</style>

<svelte:window on:keypress={handleKeypress} />

<div class="board" on:mousemove={handleMousemove}>
  {#each posts as post (post.data.uuid)}
    <Draggable
      uuid={post.data.uuid}
      position={post.position}
      on:move={handleDraggableMove}
      on:hover={handleMouseover}>
      {#if post.data.type === 'text'}
        <div>{post.data.data}</div>
      {:else if post.data.type === 'photo'}
        <PhotoPost post={post.data}>{post.data.uuid}</PhotoPost>
      {:else}
        <div>Unknown type: {post.data.type}</div>
      {/if}
    </Draggable>
  {/each}
</div>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Draggable from './Draggable.svelte';
  import PostRenderer from './PostRenderer.svelte';
  import type { PositionedPost } from './models/post';

  // Events.
  const EVENT_CREATE = 'create';
  const EVENT_DELETE = 'delete';
  const EVENT_UPDATE_POSITION = 'position';
  // Event dispatch.
  const dispatch = createEventDispatcher();

  // List of input posts.
  export let posts: PositionedPost[] = [];
  export let width: number;
  export let height: number;

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

  function handleMousewheel(event: WheelEvent) {}

  export let zoom = 1;
  $: if (document.querySelector('.board')) {
    (document.querySelector('.board') as HTMLElement).style.transform = `scale(${zoom})`;
  }
</script>

<style>
  .board {
    position: relative;
    background-color: rgba(100, 80, 192, 0.2);
    border: 1px solid black;
    transform-origin: top left;
  }
</style>

<svelte:window on:keydown={handleKeypress} />

<div
  class="board"
  on:mousemove={handleMousemove}
  on:wheel={handleMousewheel}
  style="width:{width}px;height:{height}px">
  {#each posts as post (post.data.uuid)}
    <Draggable
      uuid={post.data.uuid}
      position={post.position}
      focusable={true}
      on:move={handleDraggableMove}
      on:hover={handleMouseover}>
      <PostRenderer post={post.data} />
    </Draggable>
  {/each}
</div>

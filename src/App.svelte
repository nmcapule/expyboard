<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';

  import type { PositionedPost, Post } from './models/post';
  import Board from './components/Board.svelte';
  import type { DraggablePosition } from './models/draggable';

  function createPositionedPost(
    data?: Partial<Post>,
    position?: Partial<DraggablePosition>,
  ): PositionedPost {
    return {
      data: {
        type: 'text',
        uuid: uuidv4(),
        data: 'placeholder',
        ...data,
      },
      position: { x: 0, y: 0, a: 0, ...position },
    };
  }

  let posts: PositionedPost[] = [
    createPositionedPost({
      type: 'photo',
      data: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Wikimedia-logo.svg',
    }),
    createPositionedPost(),
    createPositionedPost(),
  ];

  function handleCreatePost(event: CustomEvent) {
    posts = [...posts, createPositionedPost({}, { ...event.detail.position })];
  }

  function handleDeletePost(event: CustomEvent) {
    posts = posts.filter((post) => post.data.uuid !== event.detail.uuid);
  }

  function handleUpdatePostPosition(event: CustomEvent) {
    const { uuid, position } = event.detail;
    posts = posts.map((post) => {
      if (post.data.uuid !== uuid) {
        return post;
      }
      return { ...post, position };
    });
  }

  let zoom = 1;
  function handleMouseWheel(event: MouseWheelEvent) {
    const { deltaY } = event;
    zoom += deltaY / 100;

    document.querySelector('main').style.transform = `scale(${zoom})`;
  }
</script>

<style>
  main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<svelte:window on:wheel={handleMouseWheel} />

<main>
  <Board
    {posts}
    on:create={handleCreatePost}
    on:delete={handleDeletePost}
    on:position={handleUpdatePostPosition} />
</main>

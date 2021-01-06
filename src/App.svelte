<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import localforage from 'localforage';

  import Board from './Board.svelte';
  import type { PositionedPost, Post } from './models/post';
  import type { DraggablePosition } from './models/draggable';
  import { onMount } from 'svelte';

  let posts: PositionedPost[] = [];
  let width = 1000,
    height = 1000,
    zoom = 1;

  onMount(() => {
    handleLoadBoard();
  });

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

  const STORAGE_BOARD_POSTS = 'experimental-board';
  const STORAGE_BOARD_CONFIG = 'experimental-board-config';

  async function handleSaveBoard() {
    await localforage.setItem(STORAGE_BOARD_POSTS, posts);
    await localforage.setItem(STORAGE_BOARD_CONFIG, {
      width,
      height,
      zoom,
    });
  }

  async function handleLoadBoard() {
    posts = await localforage.getItem(STORAGE_BOARD_POSTS);

    const boardConfig: any = await localforage.getItem(STORAGE_BOARD_CONFIG);
    if (boardConfig) {
      width = boardConfig.width;
      height = boardConfig.height;
      zoom = boardConfig.zoom;
    }
  }

  async function handleResetBoard() {
    posts = [
      createPositionedPost({
        type: 'photo',
        data: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Wikimedia-logo.svg',
      }),
      createPositionedPost(),
      createPositionedPost(),
    ];
    width = 1000;
    height = 1000;
    zoom = 1;
  }

  function scrollIntoView(uuid) {
    document
      .querySelector('#' + CSS.escape(uuid))
      .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }
</script>

<style>
  main {
    display: flex;

    width: 100%;
    height: 100%;
  }

  main > .nav {
    padding: 5px;
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
  }

  main > .nav > .control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  main > .content {
    flex: 1;
    overflow: auto;
  }
</style>

<main>
  <div class="nav">
    <div>
      <button type="button" on:click={handleResetBoard}>Reset</button>
      <button type="button" on:click={handleSaveBoard}>Save</button>
      <button type="button" on:click={handleLoadBoard}>Load</button>
    </div>
    <div class="control">
      <pre>Width</pre>
      <input type="range" bind:value={width} min="500" max="5000" step="10" />
    </div>
    <div class="control">
      <pre>Height</pre>
      <input type="range" bind:value={height} min="500" max="5000" step="10" />
    </div>
    <div class="control">
      <pre>Zoom</pre>
      <input type="range" bind:value={zoom} min="0.5" max="3.0" step="0.1" />
    </div>
    {#each posts as post}
      <button
        type="button"
        on:click={() => scrollIntoView(post.data.uuid)}>{post.data.uuid}</button>
    {/each}
    <pre>
Press 'a' to add new element.
Press 'd' to delete element.
    </pre>
  </div>
  <div class="content">
    <Board
      {width}
      {height}
      {zoom}
      {posts}
      on:create={handleCreatePost}
      on:delete={handleDeletePost}
      on:position={handleUpdatePostPosition} />
  </div>
</main>

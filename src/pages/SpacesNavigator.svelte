<script lang="ts">
  import { Icon, Link, Page } from 'framework7-svelte';
  import { v4 as uuidv4 } from 'uuid';
  import type { Workspace } from '../models/workspace';

  const workspaces: Workspace[] = [
    {
      id: uuidv4(),
      name: 'Experimental Workspace #1',
      active: true,
    },
    {
      id: uuidv4(),
      name: 'Experimental Workspace #2',
    },
    {
      id: uuidv4(),
      name: 'Experimental Workspace #3',
    },
  ];
</script>

<Page class="workspaces-page">
  <div class="workspaces-container d-flex flex-column align-items-center">
    {#each workspaces as workspace}
      <Link noLinkClass tooltip={workspace.name} class="workspaces-link">
        <div class="workspace-item" class:-active={workspace.active}>
          {workspace.name.slice(0, 2)}
        </div>
      </Link>
    {/each}
    <Link noLinkClass tooltip="Add a new workspace" class="workspaces-link">
      <div class="workspace-item -add"><Icon material="add" /></div>
    </Link>
    <Link noLinkClass tooltip="Settings" class="workspaces-link mt-auto">
      <div class="workspace-item"><Icon material="settings" /></div>
    </Link>
  </div>
</Page>

<style lang="less">
  :root {
    --spaces-width: 64px;
    --spaces-icons-size: 52px;
  }

  :global(body) {
    --f7-page-master-width: var(--spaces-width);
  }

  :global(.workspaces-page.page) {
    background-color: var(--color-steel);
  }

  .workspaces-container > :global(a.workspaces-link) {
    text-decoration: none;
  }

  .workspaces-container {
    padding-top: 6px;
    padding-bottom: 6px;
    height: 100%;

    .workspace-item {
      width: var(--spaces-icons-size);
      height: var(--spaces-icons-size);
      border-radius: var(--spaces-icons-size);
      margin-top: 4px;
      margin-bottom: 4px;
      font-size: 1.3em;
      color: var(--color-slate);
      background-color: var(--color-silver);

      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: var(--color-dark-snow);
        cursor: pointer;
      }

      &.-active {
        background-color: var(--color-snow);
      }

      &.-add {
        color: var(--color-snow);
        background-color: var(--color-slate);
      }
    }
  }
</style>

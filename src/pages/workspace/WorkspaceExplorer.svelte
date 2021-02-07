<script lang="ts">
  import { AccordionContent, Block, Button, List, ListItem } from 'framework7-svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import { interactive } from '../../actions/interactive';
  import type { NodeView, Workspace } from '../../models/workspace';
  import { focusedNodes, nodes } from './workspace.store';

  // Dispatcher.
  const dispatch = createEventDispatcher();

  // Inputs.
  export let workspace: Workspace = {
    id: 'dummy',
    name: 'Experimental Workspace #1',
    active: true,
  };

  function calculateAccordionContentMaxHeight(accordionEl: HTMLElement) {
    const containerHeight = accordionEl.offsetHeight;
    const items = accordionEl.querySelectorAll(
      '.accordion-item > .item-link, .accordion-item > .accordion-item-toggle',
    );
    const itemsHeight = [...items]
      .map((el: HTMLElement) => el.offsetHeight)
      .reduce((prev, curr) => prev + curr, 0);

    return containerHeight - itemsHeight;
  }

  let maxAccordionContentHeight = '100%';
  function setExplorerAccordionMaxHeight() {
    setTimeout(() => {
      maxAccordionContentHeight = `${calculateAccordionContentMaxHeight(
        document.querySelector('.workspace-explorer > .list'),
      )}px`;
    }, 500);
  }

  onMount(setExplorerAccordionMaxHeight);

  function focus(node: NodeView) {
    dispatch('focus', node);
  }

  function edit(node: NodeView) {
    dispatch('edit', node);
  }

  function hold(node: NodeView) {
    dispatch('hold', node);
  }
</script>

<svelte:window on:resize={setExplorerAccordionMaxHeight} />

<div class="workspace-explorer elevation-5 display-flex flex-direction-column {$$props.class}">
  <div class="display-flex align-items-center justify-content-space-between">
    <div class="title">{workspace.name}</div>
    <div class="settings display-flex align-items-center justify-content-center">
      <Button iconMaterial="settings" />
    </div>
  </div>

  <List accordionList accordionOpposite>
    <ListItem accordionItem title="Posts" accordionItemOpened>
      <AccordionContent style="max-height:{maxAccordionContentHeight}">
        <List>
          {#each $nodes as node}
            <ListItem
              class={$focusedNodes.has(node.post.id) ? 'focused-node' : ''}
              title={node.post.title}
              link="#"
            >
              <div slot="media" class="placeholder" />
              <div
                slot="content"
                class="item-overlay"
                use:interactive
                on:tap={() => focus(node)}
                on:doubletap={() => edit(node)}
                on:hold={() => hold(node)}
              />
            </ListItem>
          {/each}
        </List>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Threads and Pins">
      <AccordionContent style="max-height:{maxAccordionContentHeight}">
        <Block><p style="height:300px">Placeholder</p></Block>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="History">
      <AccordionContent style="max-height:{maxAccordionContentHeight}">
        <Block><p style="height:600px">Placeholder</p></Block>
      </AccordionContent>
    </ListItem>
  </List>
  <slot />
</div>

<style lang="less">
  .workspace-explorer {
    --f7-list-item-min-height: 32px;
    --f7-list-item-padding-vertical: 0;

    > :global(.list) {
      margin: 0;
      height: 100%;
      max-height: 100%;
    }

    :global(.accordion-item > .item-link) {
      background-color: var(--color-dark-snow);
      font-size: 0.8em;
      text-decoration: none;
      text-transform: uppercase;
    }

    :global(.accordion-item-content) {
      overflow-y: auto;
    }

    :global(.item-media > .placeholder) {
      background-color: var(--color-dark-snow);
      border-radius: 4px;
      width: 40px;
      height: 40px;
      margin: 4px;
    }

    :global(.item-content > .item-overlay) {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
    }

    :global(.focused-node) {
      background-color: var(--color-snow);
    }
  }

  .workspace-explorer {
    background-color: var(--color-snow);
    overflow-y: hidden;

    .title {
      font-size: 1.25em;
      padding: 12px;
    }

    .settings > :global(.button > .icon) {
      color: var(--color-steel);
      font-size: 20px;
    }
  }
</style>

<script lang="ts">
  import { AccordionContent, Block, List, ListItem } from 'framework7-svelte';
  import { onMount } from 'svelte';
  import type { Workspace } from '../models/workspace';

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
  onMount(() => {
    maxAccordionContentHeight = `${calculateAccordionContentMaxHeight(
      document.querySelector('.explorer-container > .list'),
    )}px`;
  });
</script>

<div class="explorer-container elevation-5 display-flex flex-direction-column {$$props.class}">
  <div class="title">{workspace.name}</div>

  <List accordionList accordionOpposite>
    <ListItem accordionItem title="Posts">
      <AccordionContent style="max-height:{maxAccordionContentHeight}">
        <Block><p style="height:600px">Placeholder</p></Block>
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
</div>

<style lang="less">
  .explorer-container {
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
  }

  .explorer-container {
    background-color: var(--color-snow);
    overflow-y: hidden;
    width: 400px;

    > .title {
      font-size: 1.25em;
      padding: 12px;
    }
  }
</style>

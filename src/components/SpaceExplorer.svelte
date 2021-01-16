<script lang="ts">
  import { AccordionContent, Block, List, ListItem } from 'framework7-svelte';
</script>

<div class="explorer-container elevation-5">
  <div class="title p-3">Space Explorer Component</div>

  <List accordionList>
    <ListItem accordionItem title="Lorem Ipsum">
      <AccordionContent>
        <Block>
          <p style="height:100%">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
            commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
            arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue
            dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
  </List>
  <List accordionList>
    <ListItem accordionItem title="Nested List">
      <AccordionContent>
        <List>
          <ListItem title="Item 1" />
          <ListItem title="Item 2" />
          <ListItem title="Item 3" />
          <ListItem title="Item 4" />
        </List>
      </AccordionContent>
    </ListItem>
    <ListItem accordionItem title="Integer semper">
      <AccordionContent>
        <Block>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
            commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
            arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue
            dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
        </Block>
      </AccordionContent>
    </ListItem>
  </List>
</div>

<style lang="less">
  .explorer-container > :global(.list) {
    margin: 0;
  }

  .explorer-container {
    background-color: var(--color-snow);
    width: 360px;

    > .title {
      font-size: 1.2em;
    }
  }
</style>

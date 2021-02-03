import { writable } from 'svelte/store';
import type { NodeView, ViewerConfig } from '../../models/workspace';

export const nodes = writable<NodeView[]>([
  { x: 0, y: 0, a: 0, post: 'hello1' },
  { x: 0, y: 100, a: 0, post: 'hello2' },
  { x: 100, y: 0, a: 0, post: 'hello3' },
]);

export const viewer = writable<ViewerConfig>({
  x: 0,
  y: 0,
  a: 0,
  zoom: 1,
});

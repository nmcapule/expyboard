import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { Position } from '../../actions/interactive';
import { PostType } from '../../models/post';
import type { NodeView } from '../../models/workspace';

export const focusedNodes = writable<Set<string>>(new Set());

export const nodes = writable<NodeView[]>([
  {
    x: 0,
    y: 0,
    a: 0,
    post: { id: uuidv4(), title: 'hello1', type: PostType.BASIC_TEXT, data: 'hello1' },
  },
  {
    x: 100,
    y: 50,
    a: 0,
    post: { id: uuidv4(), title: 'hello2', type: PostType.BASIC_TEXT, data: 'hello2' },
  },
  {
    x: 200,
    y: 100,
    a: 0,
    post: { id: uuidv4(), title: 'hello3', type: PostType.BASIC_TEXT, data: 'hello3' },
  },
]);

export const viewer = writable<Position>({
  x: -100,
  y: 0,
  a: 0,
  s: 1,
});

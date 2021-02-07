import { writable } from 'svelte/store';
import type { Position } from '../../actions/interactive';
import type { NodeView } from '../../models/workspace';

export const focusedNodes = writable<Set<string>>(new Set());

export const nodes = writable<NodeView[]>([]);

export const viewer = writable<Position>({
  x: -100,
  y: 0,
  a: 0,
  s: 1,
});

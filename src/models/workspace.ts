import type { Post } from './post';

/** Workspace container and identifier. */
export interface Workspace {
  id: string;
  name: string;
  active?: boolean;
}

/** Workspace viewer config. */
export interface ViewerConfig {
  x: number;
  y: number;
  a: number;
  zoom: number;
  disableDrag?: boolean;
  disableZoom?: boolean;
  disableRotate?: boolean;
}

/** Node placed on a workspace. */
export interface NodeView<T extends Post = Post> {
  x: number;
  y: number;
  a: number;
  post: T;
}

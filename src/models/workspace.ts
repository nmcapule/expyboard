import type { InteractiveConfig } from './interactive';
import type { Post } from './post';

/** Workspace container and identifier. */
export interface Workspace {
  id: string;
  name: string;
  active?: boolean;
}

/** Node placed on a workspace. */
export interface NodeView<T extends Post = Post> {
  x: number;
  y: number;
  a: number;
  post: T;
}

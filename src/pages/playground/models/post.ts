import type { DraggablePosition } from './draggable';

export interface Post {
  type: 'text' | 'photo' | 'clipping';
  uuid: string;
  data: string;
}

export interface PositionedPost {
  data: Post;
  position: DraggablePosition;
}

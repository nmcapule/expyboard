/** Rendering type for the post. */
export enum PostType {
  DUMMY,
  BASIC_PHOTO,
  BASIC_TEXT,
}

/** Encapsulates a post. */
export interface Post {
  id: string;
  type: PostType;
  title: string;
  data?:
    | string
    | {
        text: string;
      }
    | {
        dummy: string;
      };
}

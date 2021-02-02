/** Rendering type for the node. */
export enum NodeType {
  DUMMY,
  BASIC_PHOTO,
  BASIC_TEXT,
}

/** Encapsulates a node / post. */
export interface Node {
  id: string;
  type: NodeType;
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

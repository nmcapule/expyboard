export interface Workspace {
  id: string;
  name: string;
  active?: boolean;
}

export interface ViewerConfig {
  x: number;
  y: number;
  a: number;
  zoom: number;
  disableDrag?: boolean;
  disableZoom?: boolean;
  disableRotate?: boolean;
}

export interface NodeView<T = any> {
  x: number;
  y: number;
  a: number;
  data: T;
}

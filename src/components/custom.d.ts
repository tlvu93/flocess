declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

interface DragObject {
  id: number;
  x?: number;
  y?: number;
  name: string;
  color: Color;
}

type DragData = {
  dragObject: DragObject;
  offset: [number, number];
};

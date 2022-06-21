declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

interface NodeData {
  id: number;
  x?: number;
  y?: number;
  name: string;
  color: Color;
}

type DragData = {
  dragObject: NodeData;
  offset: [number, number];
};

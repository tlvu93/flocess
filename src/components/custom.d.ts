declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

interface TaskData {
  id: string;
  name: string;
  color: Color;
}

interface NodeData {
  id: string;
  parentId: string;
  x?: number;
  y?: number;
  name: string;
  color: Color;
}

type DraggedData = {
  draggedData: TaskData;
  offset: [number, number];
};

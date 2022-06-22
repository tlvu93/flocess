declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

interface TaskData {
  id: string;
  x?: number;
  y?: number;
  name: string;
  color: Color;
}

type DraggedTaskData = {
  taskData: TaskData;
  offset: [number, number];
};

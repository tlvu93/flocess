declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

interface TaskData {
  id: string;
  name: string;
  color: Color;
  content: string;
  resources: string[];
}

interface NodeData {
  id: string;
  originTask: TaskData
  coordinates?: {
    x: number;
    y: number;
  }


  completed: boolean;
}

type DraggedData = {
  draggedData: TaskData;
  offset: [number, number];
};

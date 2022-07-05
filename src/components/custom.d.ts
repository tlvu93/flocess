declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

interface User {
  name: string;
}

interface Task {
  id: string;
  name: string;
  color: Color;
  content?: string;
  resources?: string;
}

interface SVGTaskNode {
  id: string;
  originTask: Task;

  x: number;
  y: number;

  completed: boolean;
}

type DraggedData = {
  draggedData: Task;
  offset: [number, number];
};

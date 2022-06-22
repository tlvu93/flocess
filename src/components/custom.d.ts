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

type DraggedData = {
  draggedData: TaskData;
  offset: [number, number];
};

interface TaskContext {
  tasks: TaskData[];
  addTask: () => void;
  selectedTask: TaskData;
  setSelectedTask: (taskData: TaskData) => void;
  draggedTask: DraggedData;
  setDraggedTask: (draggedTaskData: DraggedData) => void;
}

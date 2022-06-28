import React, { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

interface TaskContext {
  tasks: TaskData[];
  addTask: (data: TaskData) => void;
  selectedTask: TaskData;
  setSelectedTask: (taskData: TaskData) => void;
  draggedTask: DraggedData;
  setDraggedTask: (draggedTaskData: DraggedData) => void;
}

const TaskContext = createContext<TaskContext>({} as TaskContext);
export const useTaskContext = () => useContext(TaskContext);

const DUMMY_TASK_COMPONENTS = [
  { id: uuid(), name: "A", color: "blue" },
  { id: uuid(), name: "B", color: "pink" },
  { id: uuid(), name: "C", color: "green" },
  { id: uuid(), name: "D", color: "yellow" },
  { id: uuid(), name: "E", color: "purple" },
  { id: uuid(), name: "A", color: "blue" },
  { id: uuid(), name: "B", color: "pink" },
  { id: uuid(), name: "C", color: "green" },
  { id: uuid(), name: "D", color: "yellow" },
  { id: uuid(), name: "E", color: "purple" },
  { id: uuid(), name: "A", color: "blue" },
  { id: uuid(), name: "B", color: "pink" },
  { id: uuid(), name: "C", color: "green" },
  { id: uuid(), name: "D", color: "yellow" },
  { id: uuid(), name: "E", color: "purple" },
];

const TaskState = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskData[]>(DUMMY_TASK_COMPONENTS);
  const [selectedTask, setSelectedTask] = useState<TaskData>({} as TaskData);
  const [draggedTask, setDraggedTask] = useState<DraggedData>(
    {} as DraggedData
  );

  const addTask = (data: TaskData) => {
    data.id = uuid();

    setTasks([...tasks, data]);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        selectedTask,
        setSelectedTask,
        draggedTask,
        setDraggedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;

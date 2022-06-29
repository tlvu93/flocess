import React, { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

interface TaskContext {
  tasks: TaskData[];
  addTask: (data: TaskData) => void;
  findTaskById: (taskId: string) => TaskData | undefined;
  selectedTask: TaskData;
  setSelectedTask: (taskData: TaskData) => void;
  draggedTask: DraggedData;
  setDraggedTask: (draggedTaskData: DraggedData) => void;
}

const TaskContext = createContext<TaskContext>({} as TaskContext);
export const useTaskContext = () => useContext(TaskContext);

const DUMMY_TASK_COMPONENTS = [
  { id: uuid(), orginID: null, name: "A", color: "#27598a" },
  { id: uuid(), name: "Drink Water", color: "#b62df7" },
  { id: uuid(), name: "Practice Music", color: "#00f702" },
  { id: uuid(), name: "Learn HTML", color: "#33383d" },
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

  const findTaskById = (taskId: string) => {
    return tasks.find((task) => task.id === taskId);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        findTaskById,
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

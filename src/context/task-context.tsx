import React, { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

// Utiliy functions
//================================================
const createTask = (
  name = "New Task",
  color = "#b62df7",
  content = "",
  resources = []
) => {
  return {
    id: uuid(),
    name,
    color,
    content,
    resources,
  };
};

const DUMMY_TASK_COMPONENTS = [
  createTask("Drink Water", "#b62df7"),
  createTask("Practice Music", "#00f702"),
  createTask("Learn HTML", "#33383d"),
];

// TaskContext
//================================================

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

import React, { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

// Utiliy functions
//================================================
const createTask = (
  name = "New Task",
  color = "#b62df7",
  content = "",
  resources = ""
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
  tasks: Task[];
  addTask: (data: Task) => void;
  updateTask: (data: Task) => void;
  deleteTask: (id: string) => void;

  selectedTask: Task;
  setSelectedTask: (taskData: Task) => void;

  draggedTask: DraggedData;
  setDraggedTask: (draggedTaskData: DraggedData) => void;
}

const TaskContext = createContext<TaskContext>({} as TaskContext);
export const useTaskContext = () => useContext(TaskContext);

const TaskState = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASK_COMPONENTS);
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
  const [draggedTask, setDraggedTask] = useState<DraggedData>(
    {} as DraggedData
  );

  const addTask = (data: Task) => {
    data.id = uuid();
    setTasks([...tasks, data]);
  };

  const updateTask = (data: Task) => {
    const updatedTasks = tasks.map<Task>((node) => {
      if (node.id === data.id) node = data;
      return node;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id === id);
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,

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

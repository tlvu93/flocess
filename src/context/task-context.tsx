import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchTasks } from 'src/utils/fetchItems';
import { v4 as uuid } from 'uuid';

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
  const [draggedTask, setDraggedTask] = useState<DraggedData>(
    {} as DraggedData
  );
  const [saving, setSaving] = useState(false);

  // Loads the Nodes on start
  useEffect(() => {
    setTasks(fetchTasks(true));
    setSaving(true);
  }, []);

  // Saves the nodes onChange
  useEffect(() => {
    if (!saving) return;

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, saving]);

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
    const updatedTasks = tasks.filter((task) => task.id !== id);
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

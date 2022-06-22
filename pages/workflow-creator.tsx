import React, { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ComponentList from '@components/component-list/component-list';
import EditModal from '@components/edit-modal/edit-modal';
import { SVGArea } from '@components/svg-area';

const DUMMY_TASK_COMPONENTS = [
  { id: uuid(), name: 'A', color: 'blue' },
  { id: uuid(), name: 'B', color: 'pink' },
  { id: uuid(), name: 'C', color: 'green' },
  { id: uuid(), name: 'D', color: 'yellow' },
  { id: uuid(), name: 'E', color: 'purple' },
];

const WORKFLOW = {};

type Props = {};

const TaskContext = createContext<TaskContext | null>(null);

function WorkflowCreator({}: Props) {
  const [tasks, setTasks] = useState<TaskData[]>(DUMMY_TASK_COMPONENTS);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<TaskData>({} as TaskData);
  const [draggedTask, setDraggedTask] = useState<DraggedData>(
    {} as DraggedData
  );

  const addTask = () => {
    let newTask = {
      id: uuid(),
      name: 'newTask',
      color: 'red',
    };

    setTasks([...tasks, newTask]);
  };

  const setModalState = (open?: boolean) => {
    if (open !== undefined) setShowModal(open);
    else {
      setShowModal(!showModal);
    }
  };

  return (
    <div className='App'>
      <TaskContext.Provider
        value={{
          tasks: tasks,
          addTask: addTask,
          selectedTask: selectedTask,
          setSelectedTask: setSelectedTask,
          draggedTask: draggedTask,
          setDraggedTask: setDraggedTask,
        }}
      >
        <SVGArea />

        <ComponentList setModalState={setModalState} />
        {showModal && <EditModal setModalState={setModalState} />}
      </TaskContext.Provider>
    </div>
  );
}

export const useTaskContext = () => useContext(TaskContext);
export default WorkflowCreator;

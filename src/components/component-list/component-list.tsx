import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { DraggableBlocks } from '@components/draggable-components';
import Container from '@layouts/Container';

const INITIAL_TASKS = [
  { id: uuid(), name: 'A', color: 'blue' },
  { id: uuid(), name: 'B', color: 'pink' },
  { id: uuid(), name: 'C', color: 'green' },
  { id: uuid(), name: 'D', color: 'yellow' },
  { id: uuid(), name: 'E', color: 'purple' },
];

function ComponentList({ setDragData }: { setDragData: Function }) {
  const [tasks, setTasks] = useState<NodeData[]>(INITIAL_TASKS);

  const addTask = () => {
    let newTask = {
      id: uuid(),
      name: 'newTask',
      color: 'red',
    };
    // add to tasks
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <Container>
        <div className='flex h-24 flex-row justify-between'>
          <DraggableBlocks tasks={tasks} setDragData={setDragData} />
          <button
            onClick={() => addTask()}
            className='rounded-xl bg-yellow-500 p-4 text-xl font-bold text-gray-800 hover:bg-yellow-600'
          >
            + New Task
          </button>
        </div>
      </Container>
    </div>
  );
}

export default ComponentList;

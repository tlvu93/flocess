import React, { useState } from 'react';

import { DraggableBlocks } from '@components/draggable-components';
import Container from '@layouts/Container';

interface ComponentList {
  tasks: TaskData[];
  addTask: () => void;
  setSelectedTask: (dragData: TaskData) => void;
  setModalState: (open?: boolean) => void;
}

function ComponentList({
  tasks,
  addTask,
  setSelectedTask: setSelectedTask,
  setModalState,
}: ComponentList) {
  return (
    <div>
      <Container>
        <div className='flex h-24 flex-row justify-between'>
          <div className='max'>
            <DraggableBlocks tasks={tasks} setDragData={setSelectedTask} />
          </div>
          <button
            onClick={() => setModalState(true)}
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

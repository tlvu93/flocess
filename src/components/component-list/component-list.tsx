import React, { useState } from 'react';

import { DraggableBlocks } from '@components/draggable-components';
import Container from '@layouts/Container';

interface ComponentList {
  tasks: NodeData[];
  addTask: () => void;
  setDragData: () => void;
}

function ComponentList({ tasks, addTask, setDragData }: ComponentList) {
  return (
    <div>
      <Container>
        <div className='flex h-24 flex-row justify-between'>
          <div className='max'>
            <DraggableBlocks tasks={tasks} setDragData={setDragData} />
          </div>
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

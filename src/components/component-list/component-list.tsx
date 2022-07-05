import React from 'react';
import { ModalType, useModal } from 'src/context/modal-context';

import TaskArea from '@components/task-area/task-area';
import Container from '@layouts/Container';

function ComponentList() {
  const { openModal } = useModal();
  return (
    <div>
      <Container>
        <div className='flex h-24 flex-row justify-between'>
          <div className='max'>
            <TaskArea />
          </div>
          <button
            onClick={() => openModal(ModalType.AddTask)}
            className='rounded-xl bg-yellow-500 p-4 text-xl font-bold text-gray-800 hover:bg-yellow-600'
          >
            <p className='select-none'>+ New Task</p>
          </button>
        </div>
      </Container>
    </div>
  );
}

export default ComponentList;

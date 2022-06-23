import React, { useState } from 'react';
import { useModalContext } from 'src/context/modal-context';

import { DraggableBlocks } from '@components/draggable-components';
import Container from '@layouts/Container';

function ComponentList() {
  const { openModal } = useModalContext();
  return (
    <div>
      <Container>
        <div className='flex h-24 flex-row justify-between'>
          <div className='max'>
            <DraggableBlocks />
          </div>
          <button
            onClick={() => openModal()}
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

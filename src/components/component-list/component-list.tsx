import React from 'react';

import { DraggableBlocks } from '@components/draggable-components';
import Container from '@layouts/Container';

function ComponentList({ setDragData }: { setDragData: Function }) {
  return (
    <div>
      <Container>
        <div className='flex h-24 flex-row justify-between'>
          <DraggableBlocks setDragData={setDragData} />
          <button className='rounded-xl bg-yellow-500 p-4 text-xl font-bold text-gray-800 hover:bg-yellow-600'>
            + New Task
          </button>
        </div>
      </Container>
    </div>
  );
}

export default ComponentList;

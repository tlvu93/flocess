import React, { useState } from 'react';

import ComponentList from '@components/component-list/component-list';
import { DraggableBlocks } from '@components/draggable-components';
import { SVGArea } from '@components/svg-area';

type Props = {};

function WorkflowCreator({}: Props) {
  const [draggedData, setDragData] = useState({});

  return (
    <div className='App'>
      <SVGArea draggedData={draggedData} />
      <button>tets</button>
      <ComponentList />
      <DraggableBlocks
        setDragData={(dragData: Object) => setDragData(dragData)}
      />
    </div>
  );
}

export default WorkflowCreator;

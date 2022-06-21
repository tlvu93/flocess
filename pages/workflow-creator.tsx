import React, { useState } from 'react';

import ComponentList from '../src/components/component-list/component-list';
import DraggableBlocks from '../src/components/draggable-components/draggable-blocks';
import SVGArea from '../src/components/svg-area/svg-area';

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

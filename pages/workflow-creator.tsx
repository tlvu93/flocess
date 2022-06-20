import React, { useState } from 'react';

import ComponentList from '../src/components/component-list/component-list';
import DraggableBlocks from '../src/components/draggable-components/draggable-blocks';
import SVGArea from '../src/components/draggable-components/svg-area';

type Props = {};

function WorkflowCreator({}: Props) {
  const [draggedData, setDragData] = useState({});
  console.log(draggedData);

  return (
    <div className='App'>
      <SVGArea draggedData={draggedData} />

      <ComponentList />
      <DraggableBlocks
        setDragData={(dragData: Object) => setDragData(dragData)}
      />
    </div>
  );
}

export default WorkflowCreator;

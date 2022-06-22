import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import ComponentList from '@components/component-list/component-list';
import { DraggableBlocks } from '@components/draggable-components';
import { SVGArea } from '@components/svg-area';

const TASK_COMPONENTS = [
  { id: uuid(), name: 'A', color: 'blue' },
  { id: uuid(), name: 'B', color: 'pink' },
  { id: uuid(), name: 'C', color: 'green' },
  { id: uuid(), name: 'D', color: 'yellow' },
  { id: uuid(), name: 'E', color: 'purple' },
];

const WORKFLOW = {};

type Props = {};

function WorkflowCreator({}: Props) {
  const [tasks, setTasks] = useState<NodeData[]>(TASK_COMPONENTS);
  const [draggedData, setDragData] = useState({});

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
    <div className='App'>
      <SVGArea draggedData={draggedData} />

      <ComponentList
        {...tasks}
        addTask={addTask}
        setDragData={(dragData: Object) => setDragData(dragData)}
      />
    </div>
  );
}

export default WorkflowCreator;

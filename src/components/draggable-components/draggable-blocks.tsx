import { DragEvent } from 'react';

import Draggable from './draggable';

interface DraggableBlocks {
  tasks: TaskData[];
  setDragData: Function;
}

const DraggableBlocks = ({ tasks, setDragData }: DraggableBlocks) => {
  const onDragStart = (dragData: DraggedTaskData) => {
    setDragData(dragData);
  };

  const onDragEnd = () => {};

  return (
    <div className='flex gap-x-4'>
      {tasks.map((b) => (
        <Draggable
          key={b.name}
          dragObject={b}
          onDragStart={(dragData) => onDragStart(dragData)}
          onDragEnd={() => onDragEnd()}
        >
          <div className='block' style={{ backgroundColor: b.color }}>
            {b.name}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default DraggableBlocks;

import { DragEvent } from 'react';

import Draggable from './draggable';

interface DraggableBlocks {
  tasks: NodeData[];
  setDragData: Function;
}

const DraggableBlocks = ({ tasks, setDragData }: DraggableBlocks) => {
  const onDragStart = (dragData: DragData) => {
    setDragData(dragData);
  };

  const onDragEnd = () => {};

  return (
    <div className='dragging-blocks'>
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

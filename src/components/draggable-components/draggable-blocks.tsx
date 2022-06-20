import { DragEvent } from 'react';

import Draggable from './draggable';

const blocks = [
  { id: 1, name: 'A', color: 'blue' },
  { id: 2, name: 'B', color: 'pink' },
  { id: 3, name: 'C', color: 'green' },
  { id: 4, name: 'D', color: 'yellow' },
  { id: 5, name: 'E', color: 'purple' },
];

interface DraggableBlocks {
  setDragData: Function;
}

const DraggableBlocks = ({ setDragData }: DraggableBlocks) => {
  const onDragStart = (dragData: DragData) => {
    setDragData(dragData);
  };

  const onDragEnd = () => {};

  return (
    <div className='dragging-blocks'>
      {blocks.map((b) => (
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

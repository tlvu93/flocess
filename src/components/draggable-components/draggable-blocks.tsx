import React, { useEffect, useRef, useState } from 'react';
import { useTaskContext } from 'src/context/task-context';

import Draggable from './draggable';

const DraggableBlocks = () => {
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const { tasks, setDraggedTask } = useTaskContext();

  const onDragStart = (draggedTaskData: DraggedData) => {
    setDraggedTask(draggedTaskData);
  };

  const onDragEnd = () => {};
  let scrollBarRef = useRef<HTMLDivElement>(null);

  const handleOnWheel = (e: React.WheelEvent) => {
    if (!scrollBarRef) return;
    else {
      scrollBarRef!.current!.scrollLeft += e.deltaY;
    }
  };

  const recordTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.changedTouches[0].screenY);
  };

  const recordTouchEnd = (e: React.TouchEvent) => {
    setTouchEndY(e.changedTouches[0].screenY);
  };

  useEffect(() => {
    if (touchStartY && touchEndY) {
      scrollBarRef.current!.scrollLeft += touchEndY - touchStartY;
      setTouchStartY(0);
      setTouchEndY(0);
    }
  }, [touchStartY, touchEndY]);

  return (
    <div
      ref={scrollBarRef}
      className='h-28 max-w-3xl overflow-x-auto'
      onWheel={handleOnWheel}
      onTouchStart={recordTouchStart}
      onTouchEnd={recordTouchEnd}
    >
      <div className='flex gap-x-4'>
        {tasks.map((task) => (
          <Draggable
            key={task.id}
            data={task}
            onDragStart={(dragData) => onDragStart(dragData)}
            onDragEnd={() => onDragEnd()}
          >
            <div
              // className="h-20 w-20 bg-[url('/puzzle-main.svg')] bg-cover"
              className='flex h-20 w-20 items-center justify-center text-center'
              style={{ backgroundColor: task.color }}
            >
              {task.name}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default DraggableBlocks;

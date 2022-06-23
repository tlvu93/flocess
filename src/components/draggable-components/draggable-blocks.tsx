import { useTaskContext } from 'src/context/task-context';

import Draggable from './draggable';

const DraggableBlocks = () => {
  const { tasks, setDraggedTask } = useTaskContext() as TaskContext;

  const onDragStart = (draggedTaskData: DraggedData) => {
    setDraggedTask(draggedTaskData);
  };

  const onDragEnd = () => {};

  return (
    <div className='flex gap-x-4'>
      {tasks.map((task) => (
        <Draggable
          key={task.name}
          data={task}
          onDragStart={(dragData) => onDragStart(dragData)}
          onDragEnd={() => onDragEnd()}
        >
          <div
            className='draggable-block'
            style={{ backgroundColor: task.color }}
          >
            {task.name}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default DraggableBlocks;

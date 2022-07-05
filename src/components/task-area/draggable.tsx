import { ReactNode } from 'react';

import { ModalType, useModal } from '@context/modal-context';
import { useTaskContext } from '@context/task-context';

interface Draggable {
  children?: ReactNode;
  data: Task;
  onDragStart: { (dragData: DraggedData): void };
  onDragEnd: Function;
}

const Draggable = ({ children, data, onDragStart, onDragEnd }: Draggable) => {
  const { setSelectedTask } = useTaskContext();
  const { openModal } = useModal();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Get the block coordinates
    let currentTargetRect = e.currentTarget! as HTMLElement;
    let boundingRect = currentTargetRect.getBoundingClientRect();

    // Find the offset of the mouse from those coordinates
    const offset = [
      e.clientX - boundingRect.left,
      e.clientY - boundingRect.top,
    ];

    // Set the text data as identifier for onDrop
    e.dataTransfer.setData('text/plain', 'dropableElement');

    // Pass the drag data
    onDragStart({ draggedData: data, offset } as DraggedData);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onDragEnd();
  };

  const handleClick = (_e: React.DragEvent<HTMLDivElement>) => {
    setSelectedTask(data);
    openModal(ModalType.EditTask);
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Draggable;

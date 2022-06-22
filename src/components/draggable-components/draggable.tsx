import { ReactNode } from 'react';

interface Draggable {
  children?: ReactNode;
  dragObject: TaskData;
  onDragStart: { (dragData: DraggedTaskData): void };
  onDragEnd: Function;
}

const Draggable = ({
  children,
  dragObject,
  onDragStart,
  onDragEnd,
}: Draggable) => {
  const onDragStarting = (e: React.DragEvent<HTMLDivElement>) => {
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
    onDragStart({ taskData: dragObject, offset } as DraggedTaskData);
  };

  const onDragEnding = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onDragEnd();
  };

  return (
    <div draggable={true} onDragStart={onDragStarting} onDragEnd={onDragEnding}>
      {children}
    </div>
  );
};

export default Draggable;

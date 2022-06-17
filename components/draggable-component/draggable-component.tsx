import { ReactNode } from 'react';

interface Draggable {
  children?: ReactNode;
  dragObject: Function;
  onDragStart: Function;
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

    // Pass the drag data
    onDragStart({ dragObject, offset });
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

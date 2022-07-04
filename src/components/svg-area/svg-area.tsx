import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import { useTaskContext } from 'src/context/task-context';
import { v4 as uuid } from 'uuid';

import { ModalType, useModalContext } from '@context/modal-context';
import { useWorkflowContext } from '@context/workflow-context';

import { convertCoordinatesDOMtoSVG } from '../../utils/convertCoordinatesDOMtoSVG';
import SVGDrawer from './svg-drawer';

const SVGArea = () => {
  const { draggedTask } = useTaskContext();
  const { setSelectedTaskNode } = useWorkflowContext();
  const { openModal } = useModalContext();

  const { svgTaskNodes, updateTaskNode, addTaskNode } = useWorkflowContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const openEditModal = () => {
    openModal(ModalType.EditTaskNode);
  };

  // Draw the Nodes onChange
  useEffect(() => {
    console.log('Should trigger a redraw!');
    SVGDrawer.draw(
      svgTaskNodes,
      updateTaskNode,
      setSelectedTaskNode,
      openEditModal
    );
  }, [svgTaskNodes]);

  // Drag Handlers
  // =================================================================

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    d3.select('svg').classed('drag-over', true);
  };

  const onDragLeave = () => {
    d3.select('svg').classed('drag-over', false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();

    d3.select('svg').classed('drag-over', false);

    // Check if the dropped Element is a dropableElement
    const identifier = e.dataTransfer.getData('text');
    if (identifier !== 'dropableElement') {
      return;
    }

    // Get the correct coordinates for this node
    const dragData = draggedTask as DraggedData;
    const { x, y } = convertCoordinatesDOMtoSVG(
      d3.select('svg'),
      e.clientX - dragData.offset[0],
      e.clientY - dragData.offset[1]
    );

    // Add the node to the list of nodes.
    const newNode: SVGTaskNode = {
      id: uuid(),
      originTask: dragData.draggedData,
      coordinates: { x: x, y: y },
      completed: false,
    };

    addTaskNode(newNode);

    return false;
  };

  return (
    <div
      className='m-1'
      onDrop={(e) => onDrop(e)}
      onDragLeave={() => onDragLeave()}
      onDragOver={(e) => onDragOver(e)}
    >
      <svg className='h-96 w-full'></svg>
    </div>
  );
};

export default SVGArea;

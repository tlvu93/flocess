import * as d3 from 'd3';
import { useEffect } from 'react';

import SVGDrawer from './svg-drawer';

const nodes: DragObject[] = [];

/**
 * Convert DOM coordinates to SVG coordinates based on SVG offset and zoom level
 */

const convertCoordinatesDOMtoSVG = (
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  x: number,
  y: number
) => {
  const svgNode = svg.node() as SVGSVGElement;
  const pt = svgNode.createSVGPoint();

  pt.x = x;
  pt.y = y;

  const domMatrix = svgNode.getScreenCTM() as DOMMatrix;
  return pt.matrixTransform(domMatrix.inverse());
};

interface SVGArea {
  draggedData: DragData | Object;
}

const SVGArea = ({ draggedData }: SVGArea) => {
  useEffect(() => {
    SVGDrawer.draw(nodes);
  }, []);

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

    // Get the correct coordinates for this node
    const dragData = draggedData as DragData;
    const { x, y } = convertCoordinatesDOMtoSVG(
      d3.select('svg'),
      e.clientX - dragData.offset[0],
      e.clientY - dragData.offset[1]
    );

    // Add the node to the list of nodes.
    nodes.push({
      id: nodes.length + 1,
      name: dragData.dragObject.name,
      color: dragData.dragObject.color,
      x,
      y,
    });

    // Redraw the nodes
    SVGDrawer.draw(nodes);

    return false;
  };

  return (
    <div
      className='svgContainer'
      onDrop={(e) => onDrop(e)}
      onDragLeave={() => onDragLeave()}
      onDragOver={(e) => onDragOver(e)}
    >
      <svg></svg>
    </div>
  );
};

export default SVGArea;

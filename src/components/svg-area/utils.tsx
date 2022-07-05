import * as d3 from 'd3';

import { PUZZLE_DIMENSION, PUZZLE_SCALE_VALUE } from './svg-drawer';

const getSnapPosition = (
  svgNodes: SVGTaskNode[],
  event: DragEvent,
  data: SVGTaskNode
) => {
  const SNAP_RANGE_PX = 30;
  const X_OFFSET = 48; // Puzzle connector length
  const PUZZLE_WIDTH = PUZZLE_SCALE_VALUE * PUZZLE_DIMENSION;

  enum SnapDirection {
    None,
    Left,
    Right,
  }

  let nodes = svgNodes.filter((node) => node.id !== data.id);

  for (let node of nodes) {
    // Check snap range
    let xDistLeft = Math.abs(event.x - (node.x - PUZZLE_WIDTH + X_OFFSET));
    let xDistRight = Math.abs(event.x - (node.x + PUZZLE_WIDTH - X_OFFSET));
    let snapDirection = SnapDirection.None;

    if (xDistLeft < SNAP_RANGE_PX) {
      snapDirection = SnapDirection.Left;
    }
    if (xDistRight < SNAP_RANGE_PX) {
      snapDirection = SnapDirection.Right;
    }

    if (snapDirection !== SnapDirection.None) {
      let y_dist = Math.abs(event.y - node.y);

      if (y_dist > SNAP_RANGE_PX) return { inSnapRange: false };

      // X and Y value are in snap range
      switch (snapDirection) {
        case SnapDirection.Left:
          return {
            inSnapRange: true,
            x: node.x - PUZZLE_WIDTH + X_OFFSET,
            y: node.y,
          };
        case SnapDirection.Right:
          return {
            inSnapRange: true,
            x: node.x + PUZZLE_WIDTH - X_OFFSET,
            y: node.y,
          };
      }
    }
  }
  return { inSnapRange: false };
};

export const handleDragEnd = (_ev: any, data: any, setNode: Function) => {
  setNode(data as SVGTaskNode);
};

export const handleDrag = (
  el: any,
  event: DragEvent,
  d: unknown,
  svgNodes: any,
  SCALE_VALUE: number
) => {
  let data = d as any;

  let { inSnapRange, x, y } = getSnapPosition(svgNodes, event, data);

  if (inSnapRange) {
    data.x = x;
    data.y = y;
  } else {
    data.x = event.x / SCALE_VALUE;
    data.y = event.y / SCALE_VALUE;
  }
  d3.select(el).attr(
    'transform',
    `scale(${SCALE_VALUE})
    translate(${data.x},${data.y})`
  );
};

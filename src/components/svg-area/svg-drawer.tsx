import * as d3 from 'd3';

/* CONSTANTS */
const PUZZLE_START_SVG =
  'M 75.183594 100.085938 L 46.929688 100.085938 C 46.160156 100.085938 45.398438 99.882812 44.734375 99.496094 C 42.828125 98.398438 41.640625 96.367188 41.640625 94.199219 C 41.640625 93.023438 42.003906 91.851562 42.695312 90.816406 C 42.925781 90.476562 43.195312 90.171875 43.507812 89.902344 C 43.527344 89.886719 43.773438 89.6875 43.789062 89.667969 C 45.054688 88.40625 45.648438 86.960938 45.648438 85.4375 C 45.648438 82.207031 43.019531 79.578125 39.789062 79.578125 C 36.558594 79.578125 33.933594 82.207031 33.933594 85.4375 C 33.933594 86.953125 34.519531 88.394531 35.59375 89.503906 C 35.703125 89.613281 35.816406 89.695312 35.925781 89.785156 C 35.9375 89.792969 36.152344 89.96875 36.164062 89.984375 C 36.59375 90.332031 36.945312 90.761719 37.210938 91.246094 C 37.734375 92.191406 38 93.1875 38 94.199219 C 38 96.359375 36.820312 98.382812 34.925781 99.488281 C 34.25 99.875 33.492188 100.082031 32.714844 100.082031 L 4.398438 100.082031 C 1.96875 100.082031 0 98.113281 0 95.691406 L 0 24.898438 C 0 22.472656 1.972656 20.503906 4.398438 20.503906 L 26.367188 20.503906 C 25.566406 18.675781 25.144531 16.6875 25.144531 14.648438 C 25.144531 6.570312 31.710938 0 39.789062 0 C 47.863281 0 54.4375 6.570312 54.4375 14.648438 C 54.4375 16.691406 54.011719 18.679688 53.210938 20.507812 L 75.183594 20.507812 C 77.609375 20.507812 79.578125 22.476562 79.578125 24.898438 L 79.578125 46.875 C 81.40625 46.066406 83.394531 45.644531 85.4375 45.644531 C 93.507812 45.644531 100.082031 52.214844 100.082031 60.292969 C 100.082031 68.367188 93.507812 74.9375 85.4375 74.9375 C 83.390625 74.9375 81.402344 74.515625 79.578125 73.710938 L 79.578125 95.691406 C 79.578125 98.117188 77.613281 100.085938 75.183594 100.085938 Z M 75.183594 100.085938';

const PUZZLE_MAIN_SVG =
  'M 86.636719 47.925781 C 84.09375 47.925781 81.726562 48.632812 79.710938 49.863281 C 78.953125 50.324219 78.003906 50.339844 77.230469 49.90625 C 76.453125 49.46875 75.976562 48.652344 75.976562 47.761719 L 75.976562 31.777344 C 75.976562 29.320312 73.910156 27.339844 71.449219 27.339844 L 51.867188 27.339844 C 51 27.339844 50.195312 26.882812 49.753906 26.132812 C 49.3125 25.382812 49.296875 24.457031 49.71875 23.695312 C 50.785156 21.769531 51.390625 19.546875 51.390625 17.1875 C 51.390625 9.777344 45.386719 3.769531 37.972656 3.769531 C 30.5625 3.769531 24.558594 9.78125 24.558594 17.191406 C 24.558594 19.546875 25.164062 21.769531 26.234375 23.695312 C 26.652344 24.457031 26.640625 25.386719 26.199219 26.132812 C 25.757812 26.882812 24.953125 27.339844 24.082031 27.339844 L 4.5 27.339844 C 2.042969 27.339844 0 29.320312 0 31.777344 L 0 47.371094 C 0 48.234375 0.457031 49.035156 1.199219 49.480469 C 1.941406 49.921875 2.863281 49.945312 3.625 49.53125 C 5.519531 48.507812 7.6875 47.925781 9.996094 47.925781 C 17.40625 47.925781 23.414062 53.933594 23.414062 61.34375 C 23.414062 68.753906 17.40625 74.761719 9.996094 74.757812 C 7.6875 74.757812 5.519531 74.175781 3.625 73.152344 C 2.863281 72.742188 1.941406 72.761719 1.195312 73.203125 C 0.453125 73.648438 0 74.449219 0 75.316406 L 0 91.832031 C 0 94.292969 2.039062 96.285156 4.5 96.285156 L 71.449219 96.285156 C 73.910156 96.285156 75.976562 94.292969 75.976562 91.832031 L 75.976562 74.921875 C 75.976562 74.035156 76.457031 73.214844 77.230469 72.78125 C 78.003906 72.347656 78.953125 72.359375 79.710938 72.824219 C 81.726562 74.050781 84.09375 74.757812 86.636719 74.757812 C 94.046875 74.761719 100.054688 68.753906 100.054688 61.34375 C 100.054688 53.933594 94.046875 47.925781 86.636719 47.925781 Z M 86.636719 47.925781';

const PUZZLE_DIMENSION = 100; // puzzle dimension 100 x 100 px
const PUZZLE_SCALE_VALUE = 2.0;

const SCALE_VALUE = 1.0; // Scale for all svgs

/*
OnDrag. When current Element is dragged near a node with the
same position, then add the position of the other element + the widht
*/

function onDragEnd(_ev: any, data: any, setNode: Function) {
  setNode(data as SVGTaskNode);
}

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

/**
 * Draw the nodes.
 * Each time this is called we only draw the added nodes since we are using "enter" only
 */

const draw = (
  svgNodes: SVGTaskNode[],
  setNode: Function,
  setSelectedTaskNode: Function,
  openEditModal: Function
) => {
  function onDrag(this: any, event: DragEvent, d: unknown) {
    /*  Note: only work with d.x instead of d.
        Could not found out why, therefore we use d.x for now
        d.x will be removed later
    */
    let data = d as any;

    let { inSnapRange, x, y } = getSnapPosition(svgNodes, event, data);

    if (inSnapRange) {
      data.x = x;
      data.y = y;
    } else {
      data.x = event.x / SCALE_VALUE;
      data.y = event.y / SCALE_VALUE;
    }
    d3.select(this).attr(
      'transform',
      `scale(${SCALE_VALUE}) 
      translate(${data.x},${data.y})`
    );
  }

  // Create a d3 DragHandler Function
  const dragHandler = d3
    .drag()
    .on('drag', onDrag)
    .on('end', (ev, data) => onDragEnd(ev, data, setNode));

  const allSelectedNodes = d3
    .select('#svg-area')
    .selectAll<SVGSVGElement, SVGTaskNode>('.node');

  allSelectedNodes
    .data(svgNodes, (node) => node.id)
    .join((enter) => {
      // Draw a group node that will contain the squre and the text
      const node = enter
        .append('g')
        .attr('class', 'node')

        .attr('transform-origin', (node) => `${node.x + 50}px ${node.y + 30}px`)
        .attr(
          'transform',
          (node) => `scale(0.7) translate(${node.x} ,${node.y})`
        )
        .call((enter) =>
          enter
            .transition()
            .duration(100)
            .attr(
              'transform',
              (node) => `scale(${SCALE_VALUE}) translate(${node.x} ,${node.y})`
            )
        )
        .on('click', (e, data) => {
          setSelectedTaskNode(data);
          openEditModal();
        });

      // Append the PuzzlePath to the group
      node
        .append('path')
        .attr('d', PUZZLE_MAIN_SVG)
        .attr('transform', `scale(${PUZZLE_SCALE_VALUE})`)
        .attr('fill', (node) => node.originTask.color);

      // Append background for text
      node
        .append('rect')
        .attr('width', 152)
        .attr('height', 30)
        .attr('y', 170)
        .attr('rx', 0)
        .attr('ry', 10)
        .attr('fill', 'rgb(31, 41, 55)');

      //Append the text
      node
        .append('text')
        .attr('x', 75)
        .attr('y', 186)
        .attr('dominant-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .attr('class', 'select-none font-bold')
        .attr('fill', 'white')
        .text((node) => {
          let text = node.originTask.name;
          if (text.length > 16) return text.slice(0, 16) + '...';
          return text;
        });
      // Append Checkmark
      node
        .filter((n) => n.completed === true)
        .append('svg')
        .attr('x', 60)
        .attr('y', 80)

        .append('polygon')
        .attr('points', '40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9')
        .attr('fill', 'green')
        .attr('transform', 'scale(1.5)')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

      return node;
    });

  const allNodes = d3.select('#svg-area').selectAll('.node') as d3.Selection<
    Element,
    unknown,
    any,
    any
  >;
  dragHandler(allNodes);
};

const SVGDrawer = {
  draw,
};

export default SVGDrawer;

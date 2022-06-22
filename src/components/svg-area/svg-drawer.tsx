import * as d3 from 'd3';

/**
 * Draw the nodes.
 * Each time this is called we only draw the added nodes since we are using "enter" only
 */
export default class SVGDrawer {
  static draw(nodes: TaskData[]) {
    d3.select('svg')
      .selectAll<SVGSVGElement, TaskData>('.node')
      .data(nodes, (node) => node.id)
      .join((enter) => {
        // Draw a group node that will contain the squre and the text
        const node = enter
          .append('g')
          .attr('class', 'node')
          .attr(
            'transform',
            (node) => 'translate(' + node.x + ',' + node.y + ')'
          );

        // Append the square
        node
          .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 72)
          .attr('height', 72)
          .attr('fill', (node) => node.color);

        // Append the text
        node
          .append('text')
          .attr('x', 36)
          .attr('y', 36)
          .attr('width', 72)
          .attr('dominant-baseline', 'middle')
          .attr('text-anchor', 'middle')
          .attr('class', 'select-none')
          .text((node) => node.name);

        return node;
      });
  }
}

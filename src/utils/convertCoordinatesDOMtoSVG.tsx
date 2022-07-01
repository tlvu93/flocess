import * as d3 from "d3";

export const convertCoordinatesDOMtoSVG = (
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

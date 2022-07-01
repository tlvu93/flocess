/**
 * Convert DOM coordinates to SVG coordinates based on SVG offset and zoom level
 */
export const fetchItems = () => {
  let parsedNodes = localStorage.getItem("nodes");

  if (!parsedNodes) {
    return [];
  } else {
    return JSON.parse(parsedNodes!);
  }
};

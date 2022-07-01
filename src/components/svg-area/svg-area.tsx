import * as d3 from "d3";
import { useEffect, useState } from "react";
import { useTaskContext } from "src/context/task-context";
import { v4 as uuid } from "uuid";
import { convertCoordinatesDOMtoSVG } from "../../utils/convertCoordinatesDOMtoSVG";
import { fetchItems } from "../../utils/fetchItems";

import SVGDrawer from "./svg-drawer";

const SVGArea = () => {
  const { draggedTask } = useTaskContext();
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchedNodes = fetchItems();
    setNodes(fetchedNodes);
    setSaving(true);
  }, []);

  useEffect(() => {
    if (!saving) {
      return;
    }

    localStorage.setItem("nodes", JSON.stringify(nodes));
  }, [nodes, saving]);

  /* 
    1. eventHandler to detect drag and drop of the svg
    2. onSave -> save the position to the nodes state
      -  this will cause and redraw

  */

  const updateNode = (n: NodeData) => {
    const tmpNodes = nodes.map<NodeData>((node) => {
      if (node.id === n.id) node = n;
      return node;
    });

    setNodes(tmpNodes);
  };

  useEffect(() => {
    SVGDrawer.draw(nodes, updateNode);
  }, [nodes]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    d3.select("svg").classed("drag-over", true);
  };

  const onDragLeave = () => {
    d3.select("svg").classed("drag-over", false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();

    d3.select("svg").classed("drag-over", false);

    // Check if the dropped Element is a dropableElement
    const identifier = e.dataTransfer.getData("text");
    if (identifier !== "dropableElement") {
      return;
    }

    // Get the correct coordinates for this node
    const dragData = draggedTask as DraggedData;
    const { x, y } = convertCoordinatesDOMtoSVG(
      d3.select("svg"),
      e.clientX - dragData.offset[0],
      e.clientY - dragData.offset[1]
    );

    // Add the node to the list of nodes.

    const newNode: NodeData = {
      id: uuid(),
      originTask: dragData.draggedData,
      coordinates: { x: x, y: y },
      completed: false,
    };

    setNodes([...nodes, newNode]);

    return false;
  };

  return (
    <div
      className="m-1"
      onDrop={(e) => onDrop(e)}
      onDragLeave={() => onDragLeave()}
      onDragOver={(e) => onDragOver(e)}
    >
      <svg className="h-96 w-full"></svg>
    </div>
  );
};

export default SVGArea;

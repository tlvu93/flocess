import { ModalType, useModalContext } from "@context/modal-context";
import { useWorkflowContext } from "@context/workflow-context";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { useTaskContext } from "src/context/task-context";
import { v4 as uuid } from "uuid";
import { convertCoordinatesDOMtoSVG } from "../../utils/convertCoordinatesDOMtoSVG";
import { fetchItems } from "../../utils/fetchItems";

import SVGDrawer from "./svg-drawer";

const SVGArea = () => {
  const { draggedTask } = useTaskContext();
  const { setSelectedTaskNode } = useWorkflowContext();
  const { openModal, closeModal } = useModalContext();

  const [svgNode, setSvgNodes] = useState<SVGTaskNode[]>([]);
  const [saving, setSaving] = useState(false);

  const openEditModal = () => {
    openModal(ModalType.EditTaskNode);
  };

  const closeEditModal = () => {
    closeModal(ModalType.EditTaskNode);
  };

  // Loads the Nodes on start
  useEffect(() => {
    setSvgNodes(fetchItems());
    setSaving(true);
  }, []);

  // Saves the nodes onChange
  useEffect(() => {
    if (!saving) return;

    localStorage.setItem("nodes", JSON.stringify(svgNode));
  }, [svgNode, saving]);

  // Draw the Nodes onChange
  useEffect(() => {
    const updateNode = (n: SVGTaskNode) => {
      const tmpNodes = svgNode.map<SVGTaskNode>((node) => {
        if (node.id === n.id) node = n;
        return node;
      });

      setSvgNodes(tmpNodes);
    };
    SVGDrawer.draw(svgNode, updateNode, setSelectedTaskNode, openEditModal);
  }, [svgNode]);

  // Drag Handlers
  // =================================================================

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
    const newNode: SVGTaskNode = {
      id: uuid(),
      originTask: dragData.draggedData,
      coordinates: { x: x, y: y },
      completed: false,
    };

    setSvgNodes([...svgNode, newNode]);

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

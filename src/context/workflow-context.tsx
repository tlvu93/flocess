import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchNodes } from 'src/utils/fetchItems';
import { v4 as uuid } from 'uuid';

interface WorkflowContext {
  svgTaskNodes: SVGTaskNode[];
  addTaskNode: (data: SVGTaskNode) => void;
  updateTaskNode: (data: SVGTaskNode) => void;
  deleteTaskNode: (id: string) => void;
  selectedTaskNode: SVGTaskNode;
  setSelectedTaskNode: (taskData: SVGTaskNode) => void;
}

const WorkflowContext = createContext<WorkflowContext>({} as WorkflowContext);
export const useWorkflowContext = () => useContext(WorkflowContext);

const WorkflowState = ({ children }: { children: React.ReactNode }) => {
  const [svgTaskNodes, setSvgTaskNodes] = useState<SVGTaskNode[]>([]);
  const [selectedTaskNode, setSelectedTaskNode] = useState<SVGTaskNode>(
    {} as SVGTaskNode
  );
  const [saving, setSaving] = useState(false);

  // Loads the Nodes on start
  useEffect(() => {
    setSvgTaskNodes(fetchNodes());

    setSaving(true);
  }, []);

  // Saves the nodes onChange
  useEffect(() => {
    if (!saving) return;

    localStorage.setItem('nodes', JSON.stringify(svgTaskNodes));
  }, [svgTaskNodes, saving]);

  const addTaskNode = (data: SVGTaskNode) => {
    data.id = uuid();

    setSvgTaskNodes([...svgTaskNodes, data]);
  };

  const updateTaskNode = (data: SVGTaskNode) => {
    const updatedTasks = svgTaskNodes.map<SVGTaskNode>((node) => {
      if (node.id === data.id) node = data;
      return node;
    });

    setSvgTaskNodes(updatedTasks);
  };

  const deleteTaskNode = (id: string) => {
    const updatedTasks = svgTaskNodes.filter((task) => task.id !== id);
    setSvgTaskNodes(updatedTasks);
  };

  return (
    <WorkflowContext.Provider
      value={{
        svgTaskNodes,
        addTaskNode,
        updateTaskNode,
        deleteTaskNode,
        selectedTaskNode,
        setSelectedTaskNode,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export default WorkflowState;

import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadWorkflows } from 'src/utils/workflow-utils';
import { v4 as uuid } from 'uuid';

interface WorkflowContext {
  workflows: Workflow[];
  selectedWorkflow: Workflow;
  setSelectedWorkflowById: (id: string) => void;
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (workflow: Workflow) => void;
  deleteWorkflow: (id: string) => void;

  taskNodes: SVGTaskNode[];
  addTaskNode: (data: SVGTaskNode) => void;
  updateTaskNode: (data: SVGTaskNode) => void;
  deleteTaskNode: (id: string) => void;
  selectedTaskNode: SVGTaskNode;
  setSelectedTaskNode: (taskData: SVGTaskNode) => void;
}

const WorkflowContext = createContext<WorkflowContext>({} as WorkflowContext);
export const useWorkflowContext = () => useContext(WorkflowContext);

const WorkflowState = ({ children }: { children: React.ReactNode }) => {
  /*Workflow States*/
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>(
    {} as Workflow
  );

  /*TaskNode States* */
  const [taskNodes, setTaskNodes] = useState<SVGTaskNode[]>([]);
  const [selectedTaskNode, setSelectedTaskNode] = useState<SVGTaskNode>(
    {} as SVGTaskNode
  );
  const [saving, setSaving] = useState(false);

  /* ============================
  Hooks
  */

  // Load all workflows on start
  useEffect(() => {
    let workflows = loadWorkflows();
    setWorkflows(workflows);
    setSaving(true);
  }, []);

  // If SVGNode changes then
  useEffect(() => {
    let workflow = selectedWorkflow;
    workflow.taskNodes = taskNodes;
    setSelectedWorkflow(workflow);
  }, [selectedWorkflow, taskNodes]);

  // Save Workflow on change
  useEffect(() => {
    if (!saving || !selectedWorkflow.id) return;

    // Check if workflow already exist
    let index = workflows.findIndex((wf) => wf.id === selectedWorkflow.id);

    if (index === -1) {
      console.log('Workflow not found... Adding new workflow\n');
      // Append new Workflow
      setWorkflows([...workflows, selectedWorkflow]);
    } else {
      // Update workflow
      console.log('Workflow updated...');
      let updatedWorkflows = workflows;
      updatedWorkflows[index] = selectedWorkflow;
      setWorkflows(updatedWorkflows);
      localStorage.setItem('workflows', JSON.stringify(workflows));
    }
  }, [taskNodes, selectedWorkflow]);

  /*
  ====================================================================== */

  const setSelectedWorkflowById = (id: string) => {
    let foundWorkflow = workflows.find((workflow) => workflow.id === id);

    if (!foundWorkflow) return;
    setSelectedWorkflow(foundWorkflow);
    setTaskNodes(foundWorkflow.taskNodes);
  };

  const addWorkflow = (workflow: Workflow) => {
    workflow.id = uuid();

    setWorkflows([...workflows, workflow]);
  };

  const updateWorkflow = (workflow: Workflow) => {
    const updatedWorkflows = workflows.map<Workflow>((node) => {
      if (node.id === workflow.id) node = workflow;
      return node;
    });

    setWorkflows(updatedWorkflows);
  };

  const deleteWorkflow = (id: string) => {
    const updatedWorkflows = workflows.filter((workflow) => workflow.id !== id);
    setWorkflows(updatedWorkflows);
  };

  const addTaskNode = (data: SVGTaskNode) => {
    data.id = uuid();

    setTaskNodes([...taskNodes, data]);
  };

  const updateTaskNode = (data: SVGTaskNode) => {
    const updatedTasks = taskNodes.map<SVGTaskNode>((node) => {
      if (node.id === data.id) node = data;
      return node;
    });

    setTaskNodes(updatedTasks);
  };

  const deleteTaskNode = (id: string) => {
    const updatedTasks = taskNodes.filter((task) => task.id !== id);
    setTaskNodes(updatedTasks);
  };

  return (
    <WorkflowContext.Provider
      value={{
        workflows,
        addWorkflow,
        updateWorkflow,
        deleteWorkflow,
        selectedWorkflow,
        setSelectedWorkflowById,

        taskNodes,
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

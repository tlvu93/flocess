import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadWorkflows } from 'src/utils/workflow-utils';
import { v4 as uuid } from 'uuid';

interface WorkflowContext {
  workflows: Workflow[];
  selectedWorkflow: Workflow;
  setSelectedWorkflow: (workflow: Workflow) => void;
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

  // Load all workflows on start
  useEffect(() => {
    console.log('Loading workflows...');
    let workflows = loadWorkflows();
    console.log('workflows: ', workflows);
    setWorkflows(workflows);
    setSaving(true);
  }, []);

  // Set the Workflow on selectedWorkflow change
  useEffect(() => {
    if (!saving || !selectedWorkflow.id) return;

    // Check if workflow already exist
    let index = workflows.findIndex((wf) => wf.id === selectedWorkflow.id);

    if (index === -1) {
      // Append new Workflow
      localStorage.setItem(
        'workflows',
        JSON.stringify([...workflows, selectedWorkflow])
      );
    } else {
      // Update workflow
      let updatedWorkflows = workflows;
      updatedWorkflows[index] = selectedWorkflow;
      setWorkflows(updatedWorkflows);
    }
  }, [saving, selectedWorkflow, workflows]);

  // Saves the Workflow on changes
  useEffect(() => {
    if (!saving) return;
    localStorage.setItem('workflows', JSON.stringify(workflows));
  }, [saving, workflows]);

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
        setSelectedWorkflow,

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

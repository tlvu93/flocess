import { v4 as uuid } from 'uuid';

export const loadWorkflow = (workflowId: string) => {
  // Should return a list of workflows or empty

  let parsedNodes = localStorage.getItem('workflows');

  if (!parsedNodes) {
    console.log('No items found in localStorage');
    return null;
  } else {
    let workflows = JSON.parse(parsedNodes!);

    let index = workflows.findIndex((wf) => wf.workflowId === workflowId);

    if (index === -1) {
      return null;
    } else {
      return workflows[index];
    }
  }
};

export const saveWorkflow = (
  workflowName: string,
  workflowId: string,
  svgTaskNodes: SVGTaskNode[]
) => {
  const workflow = {
    workflowName,
    workflowId,
    svgTaskNodes,
  };

  let parsedNodes = localStorage.getItem('workflows');
  if (!parsedNodes) {
    let workflows = [workflow];
    localStorage.setItem('workflows', JSON.stringify(workflows));
  } else {
    // Check if Workflow already exist
    let workflows: [] = JSON.parse(parsedNodes!);

    let index = workflows.findIndex(
      (wf) => wf.workflowId === workflow.workflowId
    );

    if (index === -1) {
      localStorage.setItem(
        'workflows',
        JSON.stringify([...workflows, workflow])
      );
    } else {
      workflows[index] = workflow;
      localStorage.setItem('workflows', JSON.stringify(workflows));
    }
  }
};

// Task Utility
//================================================
const createTask = (
  name = 'New Task',
  color = '#b62df7',
  content = '',
  resources = ''
) => {
  return {
    id: uuid(),
    name,
    color,
    content,
    resources,
  };
};

const DUMMY_TASK_COMPONENTS = [
  createTask('Drink Water', '#b62df7'),
  createTask('Practice Music', '#00f702'),
  createTask('Learn HTML', '#33383d'),
];

export const fetchTasks = (addDummyTasks: boolean) => {
  let parsedTasks = localStorage.getItem('tasks');

  if (!parsedTasks) {
    return addDummyTasks ? [...DUMMY_TASK_COMPONENTS] : [];
  } else {
    return JSON.parse(parsedTasks!);
  }
};

import { v4 as uuid } from 'uuid';

export const loadWorkflows = () => {
  let parsedNodes = localStorage.getItem('workflows');

  if (!parsedNodes) {
    console.log('No workflow found in localStorage');
    return [];
  } else {
    let workflows: Workflow[] = JSON.parse(parsedNodes!);
    return workflows;
  }
};

export const loadWorkflow = (workflows: Workflow[], workflowId: string) => {
  // Should return a list of workflows or empty

  let index = workflows.findIndex((wf) => wf.id === workflowId);

  if (index === -1) {
    console.log(`No workflow with id: ${workflowId} found`);
    return null;
  }

  return workflows[index];
};

export const saveWorkflow = (
  name: string,
  id: string,
  workflows: Workflow[],
  taskNodes: SVGTaskNode[]
) => {
  const workflow: Workflow = {
    name,
    id,
    taskNodes,
  };
  // Check if workflow already exist
  let index = workflows.findIndex((wf) => wf.id === workflow.id);

  if (index === -1) {
    localStorage.setItem('workflows', JSON.stringify([...workflows, workflow]));
  } else {
    workflows[index] = workflow;
    localStorage.setItem('workflows', JSON.stringify(workflows));
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
  createTask('Drink Water', '#b62df7', 'Drink Water'),
  createTask('Practice Music', '#00f702', 'Daily Routine of practicing'),
  createTask('Learn HTML', '#33383d', 'Learn HTML'),
];

export const fetchTasks = (addDummyTasks: boolean) => {
  let parsedTasks = localStorage.getItem('tasks');

  if (!parsedTasks) {
    return addDummyTasks ? [...DUMMY_TASK_COMPONENTS] : [];
  } else {
    return JSON.parse(parsedTasks!);
  }
};

import { v4 as uuid } from 'uuid';

export const loadWorkflow = (workflowId: string) => {
  // Should return a list of workflows or empty

  let parsedNodes = localStorage.getItem('workflows');

  if (!parsedNodes) {
    console.log('No items found in localStorage');
    return null;
  } else {
    let workflows: Workflow[] = JSON.parse(parsedNodes!);

    let index = workflows.findIndex((wf) => wf.id === workflowId);

    if (index === -1) {
      return null;
    } else {
      return workflows[index];
    }
  }
};

export const saveWorkflow = (
  name: string,
  id: string,
  taskNodes: SVGTaskNode[]
) => {
  const workflow: Workflow = {
    name,
    id,
    taskNodes,
  };

  let parsedNodes = localStorage.getItem('workflows');
  if (!parsedNodes) {
    let workflows = [workflow];
    localStorage.setItem('workflows', JSON.stringify(workflows));
  } else {
    // Check if Workflow already exist
    let workflows: Workflow[] = JSON.parse(parsedNodes!);

    let index = workflows.findIndex((wf) => wf.id === workflow.id);

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

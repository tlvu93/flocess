import { v4 as uuid } from 'uuid';

export const fetchNodes = () => {
  let parsedNodes = localStorage.getItem('nodes');

  if (!parsedNodes) {
    return [];
  } else {
    return JSON.parse(parsedNodes!);
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

import React from 'react';

import AddModal from './add-task-modal';
import EditModal from './edit-task-modal';
import TaskNodeModal from './task-node-modal';

const Modals = () => {
  return (
    <>
      <EditModal />
      <TaskNodeModal />
      <AddModal />
    </>
  );
};

export default Modals;

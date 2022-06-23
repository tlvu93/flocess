import React, { useState } from 'react';
import ModalState from 'src/context/modal-context';
import TaskState from 'src/context/task-context';

import ComponentList from '@components/component-list/component-list';
import EditModal from '@components/edit-modal/edit-modal';
import { SVGArea } from '@components/svg-area';

function WorkflowCreator() {
  return (
    <div className='App'>
      <ModalState>
        <TaskState>
          {/* SVG Area / Canvas where the nodes will be rendered */}
          <SVGArea />

          {/* Dashboard with Components, which are draggable */}
          <ComponentList />
          <EditModal />
        </TaskState>
      </ModalState>
    </div>
  );
}

export default WorkflowCreator;

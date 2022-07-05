import { NextPage } from 'next';
import React, { useState } from 'react';
import ModalState from 'src/context/modal-context';
import TaskState from 'src/context/task-context';

import ComponentList from '@components/component-list/component-list';
import Modals from '@components/modals/modals';
import { SVGArea } from '@components/svg-area';
import WorkflowState from '@context/workflow-context';

const WorkflowCreator: NextPage = () => {
  return (
    <ModalState>
      <TaskState>
        <WorkflowState>
          {/* SVG Area / Canvas where the nodes will be rendered */}
          <SVGArea />
          {/* Dashboard with Components, which are draggable */}
          <ComponentList />

          <Modals />
        </WorkflowState>
      </TaskState>
    </ModalState>
  );
};

export default WorkflowCreator;

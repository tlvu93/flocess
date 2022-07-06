import { NextPage } from 'next';
import React, { useState } from 'react';
import ModalState from 'src/context/modal-context';
import TaskState from 'src/context/task-context';

import ComponentList from '@components/component-list/component-list';
import Modals from '@components/modals/modals';
import { SVGArea } from '@components/svg-area';

const WorkflowCreator: NextPage = () => {
  return (
    <ModalState>
      <TaskState>
        {/* SVG Area / Canvas where the nodes will be rendered */}
        <SVGArea />
        {/* Dashboard with Components, which are draggable */}
        <ComponentList />

        <Modals />
      </TaskState>
    </ModalState>
  );
};

export default WorkflowCreator;

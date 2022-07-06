import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ModalState from 'src/context/modal-context';
import TaskState from 'src/context/task-context';

import ComponentList from '@components/component-list/component-list';
import Modals from '@components/modals/modals';
import { SVGArea } from '@components/svg-area';
import { useWorkflowContext } from '@context/workflow-context';

const WorkflowCreator: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { setSelectedWorkflowById } = useWorkflowContext();

  useEffect(() => {
    if (typeof id !== 'string') return;

    console.log('Set Selected Workflow');

    setSelectedWorkflowById(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

import React, { createContext, useContext, useState } from 'react';
import TaskState from 'src/context/task-context';
import { v4 as uuid } from 'uuid';

import ComponentList from '@components/component-list/component-list';
import EditModal from '@components/edit-modal/edit-modal';
import { SVGArea } from '@components/svg-area';

const DUMMY_TASK_COMPONENTS = [
  { id: uuid(), name: 'A', color: 'blue' },
  { id: uuid(), name: 'B', color: 'pink' },
  { id: uuid(), name: 'C', color: 'green' },
  { id: uuid(), name: 'D', color: 'yellow' },
  { id: uuid(), name: 'E', color: 'purple' },
];

const WORKFLOW = {};

type Props = {};

const TaskContext = createContext<TaskContext | null>(null);

function WorkflowCreator({}: Props) {
  const [showModal, setShowModal] = useState<boolean>(true);

  const setModalState = (open?: boolean) => {
    if (open !== undefined) setShowModal(open);
    else {
      setShowModal(!showModal);
    }
  };

  return (
    <div className='App'>
      <TaskState>
        <SVGArea />

        <ComponentList setModalState={setModalState} />
        {showModal && <EditModal setModalState={setModalState} />}
      </TaskState>
    </div>
  );
}

export default WorkflowCreator;

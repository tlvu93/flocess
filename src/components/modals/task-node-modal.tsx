import React from 'react';
import { ModalType, useModal } from 'src/context/modal-context';

import { useWorkflowContext } from '@context/workflow-context';
import { TrashIcon } from '@heroicons/react/solid';

const renderCompleteButton = (
  isCompleted: boolean,
  toggleCompleted: () => void
) => {
  let buttonStyle =
    'mr-1 mb-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none';
  let buttonText = '';
  if (isCompleted) {
    buttonText = 'Completed!';
    buttonStyle += ' bg-emerald-600';
  } else {
    buttonText = 'Mark as completed';
    buttonStyle += ' bg-gray-600';
  }

  return (
    <button
      className={buttonStyle}
      type='button'
      onClick={() => toggleCompleted()}
    >
      <p>{buttonText}</p>
    </button>
  );
};

function TaskNodeModal() {
  const { selectedTaskNode, updateTaskNode, deleteTaskNode } =
    useWorkflowContext();
  const {
    modals: { showEditTaskNodeModal },
    closeModal,
  } = useModal();

  const toggleCompleted = () => {
    const data = selectedTaskNode;
    data.completed = !data.completed;
    updateTaskNode(data);
  };

  const handleDelete = () => {
    deleteTaskNode(selectedTaskNode.id);
    closeModal(ModalType.EditTaskNode);
  };

  return (
    <>
      {showEditTaskNodeModal ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative my-6 mx-auto max-w-3xl flex-1'>
              {/*content*/}
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                {/*header*/}

                <div className='flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5'>
                  <h3 className='text-3xl font-semibold'>
                    {selectedTaskNode.originTask.name}
                  </h3>
                  <div className='flex '>
                    <button onClick={handleDelete}>
                      <TrashIcon className='ml-2 h-8 w-8 text-red-700' />
                    </button>
                  </div>
                  <button
                    className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-50 outline-none focus:outline-none'
                    onClick={() => closeModal(ModalType.EditTaskNode)}
                  >
                    <span className='block h-6 w-6 bg-transparent text-2xl text-black opacity-50 outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='relative flex flex-auto flex-col gap-y-3 p-6'>
                  <h4 className='text-2xl font-semibold'>Content</h4>
                  {selectedTaskNode.originTask.content}

                  <h4 className='text-2xl font-semibold'>Resources</h4>
                  {selectedTaskNode.originTask.resources}
                </div>

                {renderCompleteButton(
                  selectedTaskNode.completed,
                  toggleCompleted
                )}

                {/*footer*/}
                <div className='flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6'>
                  <button
                    className='background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                    type='button'
                    onClick={() => closeModal(ModalType.EditTaskNode)}
                  >
                    Close
                  </button>
                  <button
                    className='mr-1 mb-1 rounded bg-yellow-500 px-6 py-3 text-sm font-bold uppercase text-slate-700 shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600'
                    type='button'
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default TaskNodeModal;

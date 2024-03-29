import React, { useEffect, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { ModalType, useModal } from 'src/context/modal-context';

import { useTaskContext } from '@context/task-context';
import { TrashIcon } from '@heroicons/react/solid';

function EditModal() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [resources, setResources] = useState('');
  const [color, setColor] = useState('#aabbcc');

  const { selectedTask, updateTask, deleteTask } = useTaskContext();
  const {
    modals: { showEditTaskModal },
    closeModal,
  } = useModal();

  useEffect(() => {
    // Set state to selected task on select
    if (Object.keys(selectedTask).length === 0) return;
    setName(selectedTask.name);
    setColor(selectedTask.color);

    // Optionals, could be null
    if (selectedTask.content) setContent(selectedTask.content);
    if (selectedTask.resources) setResources(selectedTask.resources);
  }, [selectedTask]);

  const handleSave = () => {
    let updatedTask = selectedTask;
    updatedTask.name = name;
    updatedTask.content = content;
    updatedTask.resources = resources;
    updatedTask.color = color;

    updateTask(updatedTask);
    closeModal(ModalType.EditTask);
  };

  const handleDelete = () => {
    deleteTask(selectedTask.id);
    closeModal(ModalType.EditTask);
  };

  const handleClose = () => {
    closeModal(ModalType.EditTask);
  };
  return (
    <>
      {showEditTaskModal ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative my-6 mx-auto max-w-3xl flex-1'>
              {/*content*/}
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                {/*header*/}

                <div className='flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5'>
                  <div className='flex '>
                    <h3 className='text-3xl font-semibold'>Edit Task</h3>
                    <button onClick={handleDelete}>
                      <TrashIcon className='ml-2 h-8 w-8 text-red-700' />
                    </button>
                  </div>
                  <button
                    className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-50 outline-none focus:outline-none'
                    onClick={handleClose}
                  >
                    <span className='block h-6 w-6 bg-transparent text-2xl text-black opacity-50 outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='relative flex flex-auto flex-col gap-y-3 p-6'>
                  <h4 className='my-4 text-2xl font-semibold'>Title</h4>
                  <input
                    className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
                    id='Title'
                    type='text'
                    placeholder='Title'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <h4 className='text-2xl font-semibold'>Content</h4>
                  <textarea
                    className='
                      form-control
                      m-0
                      block
                      w-full
                      rounded
                      border
                      border-solid
                      border-gray-300
                      bg-white bg-clip-padding
                      px-3 py-1.5 text-base
                      font-normal
                      text-gray-700
                      transition
                      ease-in-out
                      focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
'
                    id='exampleFormControlTextarea1'
                    rows={3}
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                  />

                  <h4 className='text-2xl font-semibold'>Resources</h4>
                  <input
                    className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
                    id='username'
                    type='text'
                    placeholder='Resources'
                    onChange={(e) => setResources(e.target.value)}
                    value={resources}
                  />
                  <h4 className='text-2xl font-semibold'>Color</h4>
                  <div className='max-w- flex flex-col'>
                    <HexColorPicker color={color} onChange={setColor} />
                    <HexColorInput
                      className='w-[200px] border
                      border-solid
                      border-gray-300
                      bg-white bg-clip-padding'
                      color={color}
                      onChange={setColor}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6'>
                  <button
                    className='background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase  outline-none transition-all duration-150 ease-linear focus:outline-none'
                    type='button'
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className='mr-1 mb-1 rounded bg-slate-700 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600'
                    type='button'
                    onClick={handleSave}
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

export default EditModal;

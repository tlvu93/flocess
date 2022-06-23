import React from 'react';

interface EditModal {
  setModalState: (open?: boolean) => void;
}

function EditModal({ setModalState }: EditModal) {
  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
        <div className='relative my-6 mx-auto w-auto max-w-3xl'>
          {/*content*/}
          <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5'>
              <h3 className='text-3xl font-semibold'>Modal Title</h3>
              <button
                className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-50 outline-none focus:outline-none'
                onClick={() => setModalState(false)}
              >
                <span className='block h-6 w-6 bg-transparent text-2xl text-black opacity-50 outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className='relative flex-auto p-6'>
              <p className='my-4 text-lg leading-relaxed text-slate-500'>
                I always felt like I could do anything. That&apos;s the main
                thing people are controlled by! Thoughts- their perception of
                themselves! They&apos;re slowed down by their perception of
                themselves. If you&apos;re taught you can&apos;t do anything,
                you won&apos;t do anything. I was taught I could do everything.
              </p>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6'>
              <button
                className='background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                type='button'
                onClick={() => setModalState(false)}
              >
                Close
              </button>
              <button
                className='mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600'
                type='button'
                onClick={() => setModalState(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
    </>
  );
}

export default EditModal;

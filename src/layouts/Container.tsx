import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Container = ({ children, ...props }: Props) => {
  return (
    <section className='bg-gray-700 px-8 py-6 md:px-0'>
      <div className='mx-auto max-w-5xl'>
        <div className='mx-4 flex items-center justify-center'>
          <div className='mt-8 w-full md:mt-0'>
            <div className='overflow-hidden rounded-lg border-b-2 border-gray-700 bg-gray-800 p-8 py-10 px-7 text-white shadow-xl'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Container;

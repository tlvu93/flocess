import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Container = ({ children, ...props }: Props) => {
  return (
    <section className='px-8 py-6 bg-gray-100 md:px-0'>
      <div className='max-w-5xl mx-auto'>
        <div className='mx-4 flex items-center justify-center'>
          <div className='w-full mt-8 md:mt-0'>
            <div className='p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-xl px-7'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Container;

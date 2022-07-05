import { ReactNode } from 'react';

export enum ContainerStyle {
  Dark,
  Light,
  Transparent,
}
interface Props {
  style: ContainerStyle;
  children?: ReactNode;
}

const Container = ({
  style = ContainerStyle.Dark,
  children,
  ...props
}: Props) => {
  switch (style) {
    case ContainerStyle.Dark:
      return (
        <section className='bg-gray-700 px-8 py-6 md:px-0'>
          <div className='mx-auto max-w-5xl'>
            <div className='mx-4 flex items-center justify-center'>
              <div className='mt-8 w-full md:mt-0'>
                <div className='overflow-hidden rounded-lg border-b-2 border-gray-700 bg-gray-800 p-8 py-10 px-7 text-white shadow-lg'>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case ContainerStyle.Light:
      return (
        <section className='bg-gray-100 px-8 py-6 md:px-0'>
          <div className='mx-auto max-w-5xl'>
            <div className='mx-4 flex items-center justify-center'>
              <div className='mt-8 w-full md:mt-0'>
                <div className='overflow-hidden rounded-lg border-b-2 border-gray-100  p-8 py-10 px-7 text-gray-700 shadow-lg'>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    case ContainerStyle.Transparent:
      return (
        <section className='px-8 py-6 md:px-0'>
          <div className='mx-auto max-w-5xl'>
            <div className='mx-4 flex items-center justify-center'>
              <div className='mt-8 w-full md:mt-0'>
                <div className='overflow-hidden rounded-lg p-8 py-10 px-7 text-gray-700 '>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
};

export default Container;

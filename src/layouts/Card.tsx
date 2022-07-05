import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Card = ({ children, ...props }: Props) => {
  return (
    <div className='m-4 max-w-xs rounded-lg border-[1px] border-solid border-gray-300 bg-inherit p-6 text-left hover:border-slate-800 '>
      {children}
    </div>
  );
};

export default Card;

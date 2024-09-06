import React from 'react';

function PageWrapper({ children }) {
  return (
    <div className='bg-zinc-50 flex-grow overflow-auto h-full'>{children}</div>
  );
}

export default PageWrapper;

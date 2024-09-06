import React from 'react';

function OrganigramaPage() {
  return (
    <div className='h-full'>
      <iframe
        src='/organigrama.pdf#zoom=80'
        className='w-full h-full'
        allow='autoplay'
      ></iframe>
    </div>
  );
}

export default OrganigramaPage;

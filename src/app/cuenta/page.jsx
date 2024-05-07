'use client';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';

function CuentaPage() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className='flex flex-col items-center'>
      <Icon icon='mdi:account-outline' width={150} height={150} />
      <div className='w-48 grid grid-cols-2'>
        <strong>Nombre:</strong>
        {user?.nombre}
        <strong>Correo:</strong>
        {user?.email}
        <strong>Rol:</strong>
        {user?.rol}
      </div>
    </div>
  );
}

export default CuentaPage;

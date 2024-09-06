'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function UsuariosPage() {
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!user) return;
    if (user.rol !== 'decana') {
      redirect('/cuenta');
    }
  }, [user]);

  return (
    <div className='text-center'>
      No disponible al ser solo una demo de la app. <br /> Aca se mostraría la
      lista de usuarios y se podría agregar, editar o eliminar usuarios.
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { loginRequests } from '@/api/users';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import { toast } from 'react-hot-toast';

export default function Header() {
  const [defaultUserId, setDefaultUserId] = useState(1);
  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    try {
      const toastLogin = toast.loading('Iniciando sesión...');
      const res = await loginRequests({ email, password });
      if (res.status === 201) {
        toast.dismiss(toastLogin);
        localStorage.setItem('user', JSON.stringify(res.data));
        setDefaultUserId(res.data.id);
        dispatch(setUser(res.data));
      }
    } catch (error) {
      console.warn('Error al procesar la solicitud:', error);
      toast.dismiss(toastLogin);
      if (error.response && error.response.status === 401) {
        alert('Usuario o contraseña incorrectos');
      } else {
        alert('Error en la solicitud de inicio de sesión');
      }
    }
  };

  useEffect(() => {
    const defaultLogin = async () => {
      await handleLogin('usuario1@example.com', 'contraseña1');
    };
    const storedUser = window.localStorage.getItem('user');
    if (storedUser) {
      setDefaultUserId(JSON.parse(storedUser).id);
      dispatch(setUser(JSON.parse(storedUser)));
    } else {
      defaultLogin();
    }
  }, []);

  const handleRol = async (e) => {
    const rol = e.target.value;
    switch (rol) {
      case '1':
        console.log('Decana');
        await handleLogin('usuario1@example.com', 'contraseña1');
        break;
      case '2':
        console.log('Director');
        await handleLogin('usuario2@example.com', 'contraseña2');
        break;
      case '3':
        console.log('Secretaria');
        await handleLogin('usuario3@example.com', 'contraseña3');
        break;
      case '4':
        console.log('Académico');
        await handleLogin('usuario4@example.com', 'contraseña4');
        break;
      case '5':
        console.log('Funcionario');
        await handleLogin('usuario5@example.com', 'contraseña5');
        break;
      default:
        console.log('Rol no encontrado');
        break;
    }
  };
  return (
    <div className='h-12 bg-white border-b border-zinc-200 flex justify-end px-4 items-center'>
      <div className='font-medium'>
        <label
          htmlFor='rolSelect'
          className='text-sm font-medium text-gray-900'
        >
          Usuario:
        </label>
        <select
          id='rolSelect'
          onChange={handleRol}
          className='mx-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-0 cursor-pointer'
          value={defaultUserId}
        >
          <option value='1'>Decana</option>
          <option value='2'>Director</option>
          <option value='3'>Secretaria</option>
          <option value='4'>Académico</option>
          <option value='5'>Funcionario</option>
        </select>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const SideNav = () => {
  const user = useSelector((state) => state.user.user);

  let sideNavItems = [
    {
      title: 'Documentos',
      path: '/documentos',
      submenu: true,
      icon: (
        <Icon icon='material-symbols:folder-outline' width={24} height={24} />
      ),
      subMenuItems:
        user?.rol !== 'funcionario'
          ? [
              { title: 'Compartidos', path: '/documentos/compartidos' },
              { title: 'Local', path: '/documentos/local' },
              { title: 'Oficiales', path: '/documentos/oficiales' },
            ]
          : [
              { title: 'Compartidos', path: '/documentos/compartidos' },
              { title: 'Oficiales', path: '/documentos/oficiales' },
            ],
    },
    {
      title: 'Organigrama',
      path: '/organigrama',
      icon: <Icon icon='game-icons:organigram' width={24} height={24} />,
    },
    {
      title: 'Notificaciones',
      path: '/notificaciones',
      icon: <Icon icon='mingcute:notification-line' width={24} height={24} />,
    },
    {
      title: 'Cuenta',
      path: '/cuenta',
      icon: <Icon icon='mdi:account-outline' width={24} height={24} />,
      submenu: user?.rol === 'decana',
      subMenuItems: [
        { title: 'Perfil', path: '/cuenta' },
        { title: 'Usuarios', path: '/cuenta/usuarios' },
      ],
    },
    // Agrega más elementos según sea necesario
  ];

  return (
    <div className='w-60 bg-white h-screen fixed border-r border-zinc-200 text-black'>
      <div className='flex flex-col space-y-6 w-full'>
        <Link href='/'>
          <Image
            src='/logo-vertical.png' // 308x318 -> 200x206
            alt='logo'
            width={200}
            height={206}
            className='m-auto'
            priority={true}
          />
        </Link>
        <div className='flex flex-col space-y-2 px-2 '>
          {sideNavItems.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className=''>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex p-2 rounded-lg w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? 'bg-zinc-100' : ''
            }`}
          >
            <div className='flex flex-row space-x-2 items-center'>
              {item.icon}
              <span className='font-semibold text-xl'>{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon='lucide:chevron-down' width='24' height='24' />
            </div>
          </button>

          {subMenuOpen && (
            <div className='my-2 ml-12 flex flex-col space-y-4'>
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? 'font-bold' : 'font-medium'
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? 'bg-zinc-100' : ''
          }`}
        >
          <div className='flex flex-row space-x-2 items-center'>
            {item.icon}
            <span className='font-semibold text-xl'>{item.title}</span>
          </div>
        </Link>
      )}
    </div>
  );
};

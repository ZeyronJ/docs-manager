'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from '@/constants';
import { Icon } from '@iconify/react';

const SideNav = () => {
  return (
    <div className='w-60 bg-white h-screen fixed border-r border-zinc-200 text-black'>
      <div className='flex flex-col space-y-6 w-full'>
        <Link href='/'>
          <img
            src='/logo-vertical.png'
            alt='logo'
            width={200}
            className='m-auto'
          />
        </Link>

        <div className='flex flex-col space-y-2 px-2 '>
          {SIDENAV_ITEMS.map((item, idx) => {
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

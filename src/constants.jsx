import { Icon } from '@iconify/react';

export const SIDENAV_ITEMS = [
  {
    title: 'Documentos',
    path: '/documentos',
    submenu: true,
    icon: (
      <Icon icon='material-symbols:folder-outline' width={24} height={24} />
    ),
    subMenuItems: [
      { title: 'Compartidos', path: '/documentos' },
      { title: 'Local', path: '/documentos/local' },
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
    icon: <Icon icon='line-md:account' width={24} height={24} />,
  },
  // Agrega más elementos según sea necesario
];

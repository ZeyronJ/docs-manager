// Solo puede crear carpetas y subir archivos en la raíz la decana.
export const rootFoldersAndFiles = (user, path) => {
  return user?.rol === 'decana' || path[path.length - 1] !== path[0];
};

// Solo se puede realizar acciones si se tiene los permisos correspondientes.
export const hasPermissions = (permisos, row, user) => {
  return permisos
    .filter((permiso) => permiso.folder_id === row.id)
    .find((permiso) => permiso.user_id === user.id);
};

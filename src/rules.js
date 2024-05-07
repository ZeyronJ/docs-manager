// Solo puede crear carpetas y subir archivos en la raíz la decana.
export const rootFoldersAndFiles = (user, path) => {
  return user?.rol === 'decana' || path[path.length - 1] !== path[0];
};

import { useSelector, useDispatch } from 'react-redux';
import {
  setPath,
  selectItem,
  setItems,
  setSelectedFolder,
} from '../store/slices/itemSlice';
import {
  downloadDocumentRequests,
  deleteDocumentsRequests,
  moveDocumentsRequests,
  validateDocumentsRequests,
} from '@/api/documents';
import { deleteFolderRequests, moveFolderRequests } from '@/api/folders';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { hasPermissions } from '@/rules';

function Acciones() {
  const dispatch = useDispatch();
  const selectedRow = useSelector((state) => state.item.selectedItem);
  const path = useSelector((state) => state.item.path);
  const items = useSelector((state) => state.item.items);
  const folder = useSelector((state) => state.item.selectedFolder);
  const user = useSelector((state) => state.user.user);
  const permisos = useSelector((state) => state.item.permisos);
  const [moving, setMoving] = useState(false);
  const [postSend, setPostSend] = useState(null);
  const activeButtons = selectedRow
    ? 'w-full p-2 hover:bg-gray-100 text-center rounded transition-colors'
    : 'cursor-default w-full p-2 text-center rounded';

  const handleDelete = () => {
    toast((t) => (
      <span>
        Eliminar{' '}
        {selectedRow.hasOwnProperty('key') ? 'el archivo' : 'la carpeta'}{' '}
        <b>{selectedRow.name}?</b>
        <div className='flex justify-center gap-x-2 mt-1'>
          <button
            className='bg-red-600 text-white px-2 py-1 rounded'
            onClick={async () => {
              dispatch(selectItem(null));
              dispatch(
                setItems(items.filter((item) => item.id !== selectedRow.id))
              );
              toast.dismiss(t.id);
              if (selectedRow.hasOwnProperty('key')) {
                // console.log('eliminar archivo');
                const res = await deleteDocumentsRequests(selectedRow.key);
                if (res.status !== 200) {
                  toast.error('Error al eliminar el archivo');
                }
              } else {
                const res = await deleteFolderRequests(selectedRow.id);
                if (res.status !== 200) {
                  toast.error('Error al eliminar la carpeta');
                }
              }
            }}
          >
            Si, eliminar
          </button>
          <button
            className='text-neutral-500 px-2 py-1 rounded border border-gray-300'
            onClick={() => toast.dismiss(t.id)}
          >
            No, cancelar
          </button>
        </div>
      </span>
    ));
  };

  const handleMove = async (item) => {
    if (moving) {
      // Aquí manejamos el "Mover a:"
      let res;
      if (postSend.hasOwnProperty('key')) {
        // Movemos el archivo

        if (window.location.pathname !== '/documentos/oficiales') {
          // caso sección compartidos
          // Crear una copia de los items para no mutar el estado directamente
          const updatedItems = items.map((itemAux) => {
            if (itemAux.id === postSend.id) {
              // Crear una copia del objeto y modificar la propiedad 'folder'
              return { ...itemAux, folder: folder.id };
            }
            return itemAux;
          });
          setMoving(false); // Reseteamos el estado después de mover
          dispatch(setItems(updatedItems));
          res = await moveDocumentsRequests(postSend.key, {
            newFolder: folder.id,
          });
        } else {
          // caso sección oficiales
          const updatedItems = items.map((itemAux) => {
            if (itemAux.id === postSend.id) {
              // Crear una copia del objeto y modificar la propiedad 'folder'
              return { ...itemAux, foldervalidated: folder.id };
            }
            return itemAux;
          });
          setMoving(false); // Reseteamos el estado después de mover
          dispatch(setItems(updatedItems));
          res = await moveDocumentsRequests(postSend.key, {
            newFolderValidated: folder.id,
          });
        }
      } else {
        // Movemos la carpeta
        console.log('movemos carpeta');
        // Agregar la carpeta a los items
        const updatedItems = [...items, postSend].map((itemAux) => {
          if (itemAux.id === postSend.id) {
            // Crear una copia del objeto y modificar la propiedad 'folder'
            return { ...itemAux, folder: folder.id };
          }
          return itemAux;
        });
        dispatch(setItems(updatedItems));
        setMoving(false); // Reseteamos el estado después de mover
        res = await moveFolderRequests(postSend.id, {
          newFolder: folder.id,
        });
      }

      if (res.status !== 200) {
        toast.error('Error al mover el archivo/carpeta');
        return;
      }
    } else {
      // Aquí manejamos el "Mover"
      setPostSend(item);
      toast(
        <p>
          Diríjase a la carpeta donde desea mover{' '}
          {item.hasOwnProperty('key') ? 'el archivo' : 'la carpeta'}:{' '}
          <b>{item.name}</b>
        </p>,
        {
          duration: 5000,
          icon: '📂', // Icono del toast
        }
      );
      setMoving(true); // Activamos el estado de "mover"
      if (!item.hasOwnProperty('key')) {
        const updatedItems = items.filter((itemAux) => itemAux.id !== item.id);
        dispatch(setItems(updatedItems));
      }
    }
  };

  const handleValidate = async () => {
    // Crear una copia de los items para no mutar el estado directamente
    let validate;
    let foldervalidated = null;
    const updatedItems = items.map((itemAux) => {
      if (itemAux.id === selectedRow.id) {
        // Crear una copia del objeto y modificar la propiedad 'folder'
        // console.log({ ...itemAux, validated: !itemAux.validated });
        validate = !itemAux.validated;
        if (validate) {
          foldervalidated = 2;
        }
        return { ...itemAux, validated: validate, foldervalidated };
      }
      return itemAux;
    });

    dispatch(setItems(updatedItems));
    dispatch(selectItem({ ...selectedRow, validated: validate }));

    const res = await validateDocumentsRequests(selectedRow.id, {
      validate,
    });
    const res2 = await moveDocumentsRequests(selectedRow.key, {
      newFolderValidated: foldervalidated,
    });
    if (res.status !== 200 || res2.status !== 200) {
      toast.error('Error al validar el archivo');
    }
  };
  return (
    <nav className='bg-white h-full w-56 border-l border-zinc-200'>
      <div className='flex flex-col justify-between w-full'>
        <ul
          className={`text-xl mt-40 font-semibold px-2 space-y-2 ${
            !selectedRow ? 'text-gray-300' : ''
          }`}
        >
          <li>
            <button
              className={activeButtons}
              disabled={!selectedRow}
              onClick={() => {
                if (!selectedRow.hasOwnProperty('key')) {
                  if (hasPermissions(permisos, selectedRow, user)) {
                    dispatch(setPath([...path, selectedRow.id]));
                    dispatch(selectItem(null));
                    dispatch(setSelectedFolder(selectedRow));
                  } else {
                    toast.error('Usuario no autorizado', {
                      style: {
                        background: '#fee', // Puedes cambiar el color de fondo aquí también
                      },
                      duration: 2000,
                    });
                  }
                } else {
                  downloadDocumentRequests(selectedRow.key);
                }
              }}
            >
              {!selectedRow || selectedRow.hasOwnProperty('key')
                ? 'Descargar'
                : 'Abrir'}
            </button>
          </li>
          {selectedRow &&
          selectedRow.hasOwnProperty('key') &&
          window.location.pathname !== '/documentos/local' &&
          (user.rol === 'decana' || user.rol === 'director') ? (
            <li>
              <button
                className={activeButtons}
                disabled={!selectedRow}
                onClick={handleValidate}
              >
                {selectedRow.validated ? 'Invalidar' : 'Validar'}
              </button>
            </li>
          ) : null}
          {selectedRow || postSend ? (
            <li>
              <button
                className={
                  !moving
                    ? activeButtons
                    : 'w-full p-2 hover:bg-gray-100 text-center rounded text-black'
                }
                disabled={!(moving || selectedRow)}
                onClick={() => {
                  if (hasPermissions(permisos, selectedRow, user)) {
                    handleMove(selectedRow);
                  } else {
                    toast.error('Usuario no autorizado', {
                      style: {
                        background: '#fee', // Puedes cambiar el color de fondo aquí también
                      },
                      duration: 2000,
                    });
                  }
                }}
              >
                {moving ? `Mover a: ${folder.name}` : 'Mover'}
              </button>
            </li>
          ) : null}
          <li>
            <button
              className={activeButtons}
              disabled={!selectedRow}
              onClick={() => {
                if (!selectedRow.hasOwnProperty('key')) {
                  if (hasPermissions(permisos, selectedRow, user)) {
                    handleDelete();
                  } else {
                    toast.error('Usuario no autorizado', {
                      style: {
                        background: '#fee', // Puedes cambiar el color de fondo aquí también
                      },
                      duration: 2000,
                    });
                  }
                } else {
                  handleDelete();
                }
              }}
            >
              Eliminar
            </button>
          </li>
          <p className='p-2 text-base mt-4 text-center'>
            {selectedRow === null
              ? ''
              : selectedRow.hasOwnProperty('description') && (
                  <>
                    Descripción: <br />
                    <em className='break-words'>
                      {selectedRow.description
                        ? selectedRow.description
                        : 'Sin descripción'}
                    </em>
                  </>
                )}
          </p>
        </ul>
      </div>
    </nav>
  );
}

export default Acciones;

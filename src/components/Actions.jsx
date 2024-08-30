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
} from '@/api/documents';
import { deleteFolderRequests, moveFolderRequests } from '@/api/folders';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

function Acciones() {
  const dispatch = useDispatch();
  const selectedRow = useSelector((state) => state.item.selectedItem);
  const path = useSelector((state) => state.item.path);
  const items = useSelector((state) => state.item.items);
  const folder = useSelector((state) => state.item.selectedFolder);
  const [moving, setMoving] = useState(false);
  const [postSend, setPostSend] = useState(null);
  const activeButtons = selectedRow
    ? 'w-full p-2 hover:bg-gray-100 text-center rounded'
    : 'cursor-default w-full p-2 text-center rounded';

  const handleDelete = () => {
    toast((t) => (
      <span>
        Eliminar{' '}
        {selectedRow.hasOwnProperty('key') ? 'el archivo' : 'la carpeta'}{' '}
        <b>{selectedRow.name}?</b>
        <div className='flex justify-center gap-x-2 mt-1'>
          <button
            className='bg-red-500 text-white px-2 py-1 rounded'
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
            className='bg-gray-500 text-white px-2 py-1 rounded'
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
      // Crear una copia de los items para no mutar el estado directamente
      const updatedItems = items.map((itemAux) => {
        if (itemAux.id === postSend.id) {
          // Crear una copia del objeto y modificar la propiedad 'folder'
          return { ...itemAux, folder: folder.id };
        }
        return itemAux;
      });

      dispatch(setItems(updatedItems));
      if (postSend.hasOwnProperty('key')) {
        // Movemos el archivo
        console.log('movemos archivo');
        res = await moveDocumentsRequests(postSend.key, {
          newFolder: folder.id,
        });
      } else {
        // Movemos la carpeta
        console.log('movemos carpeta');
        res = await moveFolderRequests(postSend.id, {
          newFolder: folder.id,
        });
      }

      if (res.status !== 200) {
        toast.error('Error al mover el archivo/carpeta');
        return;
      }
      setMoving(false); // Reseteamos el estado después de mover
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
                  dispatch(setPath([...path, selectedRow.id]));
                  dispatch(selectItem(null));
                  dispatch(setSelectedFolder(selectedRow));
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
          {selectedRow && selectedRow.hasOwnProperty('key') ? (
            <li>
              <button
                className={activeButtons}
                disabled={!selectedRow}
                onClick={() => console.log('validar')}
              >
                Validar
              </button>
            </li>
          ) : null}

          <li>
            <button
              className={
                !moving
                  ? activeButtons
                  : 'w-full p-2 hover:bg-gray-100 text-center rounded text-black'
              }
              disabled={!(moving || selectedRow)}
              onClick={() => handleMove(selectedRow)}
            >
              {moving ? `Mover a: ${folder.name}` : 'Mover'}
            </button>
          </li>
          <li>
            <button
              className={activeButtons}
              disabled={!selectedRow}
              onClick={handleDelete}
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

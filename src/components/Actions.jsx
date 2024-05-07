import { useSelector, useDispatch } from 'react-redux';
import { setPath, selectItem, setItems } from '../store/slices/itemSlice';
import {
  downloadDocumentRequests,
  deleteDocumentsRequests,
} from '@/api/documents';
import { deleteFolderRequests } from '@/api/folders';
import { toast } from 'react-hot-toast';

function Acciones() {
  const dispatch = useDispatch();
  const selectedRow = useSelector((state) => state.item.selectedItem);
  const path = useSelector((state) => state.item.path);
  const items = useSelector((state) => state.item.items);
  const activeButtons = selectedRow
    ? 'w-full text-left p-2 hover:bg-gray-100 text-center rounded'
    : 'cursor-default w-full text-left p-2 text-center rounded';

  const handleDelete = () => {
    toast((t) => (
      <span>
        Eliminar{' '}
        {selectedRow.hasOwnProperty('path') ? 'el archivo' : 'la carpeta'}{' '}
        <b>{selectedRow.name}?</b>
        <div className='flex justify-center gap-x-2 mt-1'>
          <button
            className='bg-red-500 text-white px-2 py-1 rounded'
            onClick={() => {
              if (selectedRow.hasOwnProperty('path')) {
                // console.log('eliminar archivo');
                deleteDocumentsRequests(selectedRow.id);
                dispatch(selectItem(null));
                dispatch(
                  setItems(items.filter((item) => item.id !== selectedRow.id))
                );
              } else {
                deleteFolderRequests(selectedRow.id);
                dispatch(selectItem(null));
                dispatch(
                  setItems(items.filter((item) => item.id !== selectedRow.id))
                );
              }
              toast.dismiss(t.id);
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
                if (!selectedRow.hasOwnProperty('path')) {
                  dispatch(setPath([...path, selectedRow.id]));
                  dispatch(selectItem(null));
                } else {
                  downloadDocumentRequests(selectedRow.id);
                }
              }}
            >
              {!selectedRow || selectedRow.hasOwnProperty('path')
                ? 'Descargar'
                : 'Abrir'}
            </button>
          </li>
          {selectedRow && selectedRow.hasOwnProperty('path') ? (
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
            <button className={activeButtons} disabled={!selectedRow}>
              Mover
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
            {selectedRow === null ? (
              ''
            ) : (
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

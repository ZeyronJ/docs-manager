'use client';
import { useState, useRef, useEffect } from 'react';
import Actions from '@/components/Actions';
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPath,
  selectItem,
  setItems,
  setPermisos,
  setSelectedFolder,
} from '@/store/slices/itemSlice';
import {
  createFoldersRequests,
  createFolderPermissionsRequests,
} from '@/api/folders';
import { createDocumentsRequests } from '@/api/documents';
import { Icon } from '@iconify/react';
import { toast } from 'react-hot-toast';
import { DateTime } from 'luxon';
import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import { redirect } from 'next/navigation';

export default function DocumentosPage() {
  const dispatch = useDispatch();
  const path = useSelector((state) => state.item.path);
  const permisos = useSelector((state) => state.item.permisos);
  const user = useSelector((state) => state.user.user);
  const [selectedRow, setSelectedRow] = useState(null); // Necesario? ya tengo selectedItem
  const [openOptions, setOpenOptions] = useState(false);
  const buttonRef = useRef(null);
  const { items, loading, users, permisosCheckBox, setPermisosCheckBox } =
    useFetchData({ type: 'locales' });

  useEffect(() => {
    if (!user) return;
    if (user.rol === 'funcionario') {
      redirect('/documentos/compartidos');
    }
  }, [user]);

  const columns = [
    {
      name: 'Nombre',
      selector: (row) => row.name,
    },
    {
      name: 'Propietario',
      selector: (row) => row.owner,
    },
    {
      name: 'Creación',
      selector: (row) => {
        const localDateTime = DateTime.fromISO(row.created).toLocaleString({
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          ...DateTime.DATETIME_MED,
        });
        return localDateTime;
      },
      sortable: true,
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => selectedRow === row,
      style: {
        backgroundColor: '#e3e3e3',
      },
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold', // Establece el peso de la fuente en negrita
      },
    },
  };

  const handleRowClicked = (row) => {
    // Si la fila seleccionada es la misma, deseleccionarla
    if (selectedRow === row) {
      setSelectedRow(null);
      dispatch(selectItem(null));
    } else {
      setSelectedRow(row);
      dispatch(selectItem(row));
    }
  };

  const handleSubmitFolder = async (ev) => {
    ev.preventDefault();
    // console.log(ev.target.folderName.value);
    const user = JSON.parse(localStorage.getItem('user'));
    const loadingToast = toast.loading('Creando carpeta...');
    const res = await createFoldersRequests({
      name: ev.target.folderName.value,
      owner: user.id,
      folder: path[path.length - 1],
      description: ev.target.description?.value,
    });
    if (res.status === 200) {
      toast.dismiss(loadingToast);
      const newFolder = res.data.folder;
      dispatch(setItems([...items, newFolder]));
      const permisosAux = permisosCheckBox
        .filter((permiso) => permiso.checked)
        .map((permiso) => permiso.id);
      await createFolderPermissionsRequests({
        folder_id: newFolder.id,
        users_id: permisosAux,
      });
      const newPermisos = permisosAux.map((permiso) => ({
        user_id: permiso,
        folder_id: newFolder.id,
      }));
      dispatch(setPermisos([...permisos, ...newPermisos]));
    } else {
      console.error('Error al crear la carpeta:', res);
      toast.dismiss(loadingToast);
      toast.error('Error al crear la carpeta', {
        style: {
          background: '#fee', // Puedes cambiar el color de fondo aquí también
        },
      });
    }
    setOpenOptions(false);
    ev.target.reset();
  };

  const handleSubmitFile = async (ev) => {
    // console.log(ev.target.files[0]);
    try {
      const file = ev.target.files[0];
      const maxFileSize = 1024 * 1024 * 5; // 5MB
      if (file.size > maxFileSize) {
        alert('El archivo es muy grande, el tamaño máximo es de 5MB');
        return;
      }
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await createDocumentsRequests({
        owner: user.id,
        folder: path[path.length - 1],
        documento: file,
      });
      // console.log(res);
      if (res.status === 200) {
        const newDocument = res.data.document;
        dispatch(setItems([...items, newDocument]));
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  const handleCheckBox = (id) => {
    setPermisosCheckBox((prevState) =>
      prevState.map((permiso) => {
        if (permiso.id === id) {
          return { id, checked: !permiso.checked };
        }
        return permiso;
      })
    );
  };
  // console.log('items:', items);
  // console.log(path[path.length - 1]);
  const data = items.filter((item) => item.folder === path[path.length - 1]);

  return (
    <div className='flex justify-between h-full'>
      <div className='flex flex-grow flex-col px-4'>
        {/* Botones de tabla */}
        {
          <div className='flex justify-center mt-2'>
            <form
              className='mr-4 flex items-center'
              onSubmit={handleSubmitFolder}
            >
              <input
                className='p-2 border border-gray-300 rounded focus:outline-blue-300'
                type='text'
                placeholder='Nombre carpeta'
                name='folderName'
                autoComplete='off'
              />
              <button
                type='submit'
                className='border border-black rounded p-2 hover:bg-zinc-100 transition-colors'
                ref={buttonRef}
              >
                Crear carpeta
              </button>
              <button
                className='border border-black rounded p-2 hover:bg-zinc-100 transition-colors'
                type='button'
                onClick={() => setOpenOptions(!openOptions)}
              >
                <Icon
                  icon='vscode-icons:file-type-config'
                  width={24}
                  height={24}
                />
              </button>
              {/* Dropdown menu */}
              {openOptions && (
                <div
                  className='absolute z-10 bg-white rounded p-2 shadow'
                  style={{
                    top:
                      buttonRef.current.offsetTop +
                      buttonRef.current.offsetHeight,
                    left: buttonRef.current.offsetLeft,
                  }}
                >
                  <textarea
                    type='text'
                    name='description'
                    placeholder='Descripción'
                    className='p-2 border border-gray-300 rounded focus:outline-blue-300 resize-none'
                    rows={4}
                  />
                  <p>Permisos</p>
                  {users.map((user) => (
                    <div key={user.id} className='flex items-center'>
                      <input
                        type='checkbox'
                        defaultChecked
                        id={user.id}
                        onChange={() => handleCheckBox(user.id)}
                      />
                      <label htmlFor={user.id} className='ml-2'>
                        {user.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </form>
            <form className='flex items-center'>
              <label
                htmlFor='documento'
                className='bg-violet-100 font-semibold text-violet-700 text-base py-2 px-4 rounded-full border-0 hover:bg-violet-200 block transition-colors hover:cursor-pointer'
              >
                Subir archivo
              </label>
              <input
                id='documento'
                type='file'
                name='documento'
                onChange={handleSubmitFile}
                className='hidden'
                accept='.txt,.doc,.docx,.pdf,.jpg,.png,.gif,.mp3,.mp4,.zip,.rar,.xlsx,.xls'
              />
              <p className='text-black/70 text-sm'>(max 5MB)</p>
            </form>
          </div>
        }

        {/* Ruta de navegación */}
        <div className='bg-white border-x mt-2 h-8 pl-2 text-center font-semibold'>
          <h1
            className='cursor-pointer inline-block text-xl hover:bg-zinc-100 p-1 px-2 rounded-lg'
            onClick={() => {
              dispatch(setPath(path.slice(0, -1)));
              dispatch(selectItem(null));
              setSelectedRow(null);
            }}
          >
            {items.map((item) => {
              // Si el item es una carpeta y es el último de la ruta
              if (
                !item.hasOwnProperty('key') &&
                item.id === path[path.length - 1]
              ) {
                // Si no es el primer item de la ruta no mostrar el nombre ya que seria la raíz
                if (item.id !== path[0]) {
                  return item.name;
                }
              }
            })}
          </h1>
        </div>
        {/* Tabla */}
        <DataTable
          className='border shadow'
          columns={columns}
          data={data}
          highlightOnHover
          pointerOnHover
          onRowClicked={handleRowClicked}
          conditionalRowStyles={conditionalRowStyles}
          onRowDoubleClicked={(row) => {
            if (!row.hasOwnProperty('key')) {
              if (
                permisos
                  .filter((permiso) => permiso.folder_id === row.id)
                  .find((permiso) => permiso.user_id === user.id)
              ) {
                dispatch(setPath([...path, row.id]));
                dispatch(setSelectedFolder(row));
                dispatch(selectItem(null));
              } else {
                // toast de 1 segundo
                toast.error('Usuario no autorizado', {
                  style: {
                    background: '#fee', // Puedes cambiar el color de fondo aquí también
                  },
                  duration: 2000,
                });
              }
            }
          }}
          pagination={data.length > 10}
          paginationRowsPerPageOptions={[10, 15]}
          customStyles={customStyles}
          progressPending={loading}
          progressComponent={<Spinner />}
          noDataComponent={
            <div>
              <br />
              <br />
            </div>
          }
        />
      </div>
      <Actions />
    </div>
  );
}

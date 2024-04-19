'use client';
import React, { useState, useEffect } from 'react';
import Actions from '@/components/Actions';
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { setPath, selectItem } from '@/store/slices/itemSlice';

export default function DocumentosPage() {
  useEffect(() => {
    fetch('http://localhost:3001/documents')
      .then((res) => res.json())
      .then((data) => setDocuments(data));
    fetch('http://localhost:3001/folders')
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
        dispatch(setPath([data[0].id]));
      });
  }, []);

  const path = useSelector((state) => state.item.path);
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [folders, setFolders] = useState([]);

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
        const date = new Date(row.created);
        return date.toLocaleString();
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

  const data = [...folders, ...documents].filter(
    (item) => item.folder === path[path.length - 1]
  );
  return (
    <div className='flex justify-between'>
      <div className='flex flex-grow flex-col px-4'>
        {/* Botones de tabla */}
        <div className='flex justify-center'>
          <form
            className='mr-4'
            // onSubmit={handleSubmitFolder}
          >
            <input
              className='p-2 border border-gray-300 rounded focus:outline-blue-300'
              type='text'
              placeholder='Nombre carpeta'
              name='folderName'
              autoComplete='off'
            />
            <button type='submit' className='border border-black rounded p-2'>
              Crear carpeta
            </button>
            <button className='border border-black rounded p-2'>*</button>
          </form>
          <form>
            <label
              htmlFor='documento'
              className='bg-violet-50 font-semibold text-violet-700 text-base py-2 px-4 rounded-full border-0 hover:bg-violet-100 block'
            >
              Subir archivo
            </label>
            <input
              id='documento'
              type='file'
              name='documento'
              // onChange={handleSubmitFile}
              className='hidden'
            />
          </form>
        </div>
        {/* Ruta de navegación */}
        <div className='bg-white border-x mt-2 h-8 pl-2 text-center font-semibold'>
          <h1
            className='cursor-pointer inline-block text-xl'
            onClick={() => dispatch(setPath(path.slice(0, -1)))}
          >
            {folders.map((folder) => {
              if (folder.id === path[path.length - 1]) {
                if (folder.id !== path[0]) {
                  return folder.name;
                }
              }
            })}
          </h1>
        </div>
        {/* Tabla */}
        <DataTable
          className='border'
          columns={columns}
          data={data}
          highlightOnHover
          pointerOnHover
          onRowClicked={handleRowClicked}
          conditionalRowStyles={conditionalRowStyles}
          onRowDoubleClicked={(row) => {
            if (!row.hasOwnProperty('path')) {
              dispatch(setPath([...path, row.id]));
              dispatch(selectItem(null));
            }
          }}
        />
      </div>
      <Actions />
    </div>
  );
}

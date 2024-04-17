function Acciones() {
  return (
    <div className='bg-white h-screen w-56'>
      <div className='flex flex-col h-full justify-between'>
        <ul className='text-xl mt-40 font-semibold'>
          <li>
            <button className='w-full text-left p-2 hover:bg-gray-300'>
              Descargar/Abrir
            </button>
          </li>
          <li>
            <button className='w-full text-left p-2 hover:bg-gray-300'>
              Validar
            </button>
          </li>
          <li>
            <button className='w-full text-left p-2 hover:bg-gray-300'>
              Mover
            </button>
          </li>
          <li>
            <button className='w-full text-left p-2 hover:bg-gray-300'>
              Eliminar
            </button>
          </li>
          <p className='p-2 text-base mt-4 text-center'>Descripción:</p>
        </ul>
      </div>
    </div>
  );
}

export default Acciones;

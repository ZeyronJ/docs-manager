export default function Home() {
  return (
    <div className='flex flex-col items-center justify-between'>
      <div className='p-6 bg-white shadow-lg rounded-lg h-full '>
        <h1 className='text-2xl font-bold mb-4'>Descripción del Sistema of</h1>
        <p className='mb-6'>
          Hemos realizado una actualización integral del sistema de gestión de
          documentos para la Facultad de Odontología de la Universidad de Chile.
          Esta actualización incluye una mejora significativa en el diseño de la
          interfaz, haciendo que las secciones sean más claras y fáciles de
          navegar. Además, hemos actualizado las tecnologías del sistema,
          migrando a Next.js y utilizando AWS para el almacenamiento seguro de
          archivos en la nube.
        </p>
        <h2 className='text-xl font-semibold mb-2'>Secciones del Sistema</h2>
        <ul className='list-disc list-inside mb-6 space-y-4'>
          <li>
            <strong>
              Documentos Compartidos{' '}
              <code className='bg-gray-100 px-2 py-1 rounded'>
                (/documentos/compartidos)
              </code>
              :
            </strong>
            Aquí se gestionan todos los documentos generales del sistema. Los
            usuarios pueden validar documentos en esta sección.
          </li>
          <li>
            <strong>
              Documentos Locales{' '}
              <code className='bg-gray-100 px-2 py-1 rounded'>
                (/documentos/local)
              </code>
              :
            </strong>
            Esta sección permite a cada usuario gestionar sus propios documentos
            de manera independiente, con un espacio de almacenamiento personal y
            exclusivo.
          </li>
          <li>
            <strong>
              Documentos Oficiales{' '}
              <code className='bg-gray-100 px-2 py-1 rounded'>
                (/documentos/oficiales)
              </code>
              :
            </strong>
            En esta sección se almacenan los documentos validados y firmados por
            la decana. Los documentos validados en la sección de documentos
            compartidos también se muestran aquí.
          </li>
          <li>
            <strong>
              Organigrama{' '}
              <code className='bg-gray-100 px-2 py-1 rounded'>
                (/organigrama)
              </code>
              :
            </strong>
            Sección dedicada a la visualización del organigrama institucional.
          </li>
          <li>
            <strong>
              Notificaciones{' '}
              <code className='bg-gray-100 px-2 py-1 rounded'>
                (/notificaciones)
              </code>
              :
            </strong>
            Aquí los usuarios pueden gestionar las notificaciones, incluyendo la
            creación y revisión de notificaciones enviadas y recibidas.
          </li>
          <li>
            <strong>
              Cuenta{' '}
              <code className='bg-gray-100 px-2 py-1 rounded'>(/cuenta)</code>:
            </strong>
            Sección donde se muestran los detalles del perfil del usuario
            actual.
          </li>
          <li>
            <strong>
              Usuarios del Sistema{' '}
              <code className='bg-gray-100 px-2 py-1 rounded'>
                (/cuenta/usuarios)
              </code>
              :
            </strong>
            Esta sección permite gestionar los usuarios del sistema, aunque al
            ser una demo, esta funcionalidad está desactivada.
          </li>
        </ul>
        <h2 className='text-xl font-semibold mb-2'>Login simplificado</h2>
        <p className='mb-6'>
          Dado que solo es una demo, hemos simplificado el proceso de login para
          que se mas fácil de probar. Para acceder al sistema, simplemente haz
          click en el botón en la esquina superior derecha de la pantalla. No es
          necesario ingresar un correo o contraseña.
        </p>
        <h2 className='text-xl font-semibold mb-2'>Tabla de permisos</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-collapse border border-gray-300 text-center'>
            <thead className='bg-gray-100 '>
              <tr>
                <th className='border border-gray-300 px-4 py-2'>Permisos</th>
                <th className='border border-gray-300 px-4 py-2'>Decana</th>
                <th className='border border-gray-300 px-4 py-2'>Director</th>
                <th className='border border-gray-300 px-4 py-2'>Secretaria</th>
                <th className='border border-gray-300 px-4 py-2'>Académico</th>
                <th className='border border-gray-300 px-4 py-2'>
                  Funcionario
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Crear carpetas y subir archivos
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Crear carpetas o subir archivos en raíz de compartidos y
                  oficiales
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Descargar archivos
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Abrir carpetas permitidas
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Mover carpetas permitidas
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Eliminar carpetas permitidas y archivos
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Validar/invalidar
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Acceder a Documentos Compartidos
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Acceder a Documentos Locales
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Acceder a Documentos Oficiales
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Acceder a Organigrama
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Acceder a Notificaciones
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Acceder a Perfil de cuenta
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
              </tr>
              <tr>
                <td className='border border-gray-300 px-4 py-2'>
                  Acceder a Usuarios
                </td>
                <td className='border border-gray-300 px-4 py-2'>✔️</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
                <td className='border border-gray-300 px-4 py-2'>❌</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

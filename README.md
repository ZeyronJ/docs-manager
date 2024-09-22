# Sistema de Gestión de Documentos - Facultad de Odontología, Universidad de Chile

Este proyecto consiste en una actualización integral del sistema de gestión de documentos para la Facultad de Odontología de la Universidad de Chile. La actualización incluye mejoras en el diseño de la interfaz y la migración tecnológica hacia **Next.js** y **AWS S3** para almacenamiento en la nube.

## Descripción del Sistema

Hemos realizado una mejora significativa en el diseño de la interfaz, haciendo que las secciones sean más claras y fáciles de navegar. Además, se han actualizado las tecnologías del sistema, migrando a **Next.js** y utilizando **AWS** para un almacenamiento seguro de archivos en la nube.

## Secciones del Sistema

- **Documentos Compartidos** (`/documentos/compartidos`): En esta sección se gestionan los documentos generales del sistema. Los usuarios tienen la capacidad de validar documentos.
  
- **Documentos Locales** (`/documentos/local`): Permite a cada usuario gestionar sus propios documentos de manera independiente, con espacio de almacenamiento personal.

- **Documentos Oficiales** (`/documentos/oficiales`): Aquí se almacenan los documentos validados y firmados por la decana. Los documentos validados en la sección de compartidos también se muestran aquí.

- **Organigrama** (`/organigrama`): Sección dedicada a la visualización del organigrama institucional.

- **Notificaciones** (`/notificaciones`): Los usuarios pueden gestionar las notificaciones, tanto enviadas como recibidas.

- **Cuenta** (`/cuenta`): Aquí se pueden ver los detalles del perfil del usuario actual.

- **Usuarios del Sistema** (`/cuenta/usuarios`): Permite gestionar los usuarios del sistema. Esta funcionalidad está deshabilitada en la demo.

## Login Simplificado

El proceso de login ha sido simplificado para facilitar la prueba del sistema. No es necesario ingresar un correo o contraseña, simplemente haz clic en el botón en la esquina superior derecha para acceder.

## Tabla de Permisos

| Permisos | Decana | Director | Secretaria | Académico | Funcionario |
|----------|--------|----------|------------|-----------|-------------|
| Crear carpetas y subir archivos | ✔️ | ✔️ | ✔️ | ✔️ | ❌ |
| Crear carpetas o subir archivos en raíz de compartidos y oficiales | ✔️ | ❌ | ❌ | ❌ | ❌ |
| Descargar archivos | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| Abrir carpetas permitidas | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| Mover carpetas permitidas | ✔️ | ✔️ | ✔️ | ✔️ | ❌ |
| Eliminar carpetas permitidas y archivos | ✔️ | ✔️ | ✔️ | ✔️ | ❌ |
| Validar/invalidar | ✔️ | ✔️ | ❌ | ❌ | ❌ |
| Acceder a Documentos Compartidos | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| Acceder a Documentos Locales | ✔️ | ✔️ | ✔️ | ❌ | ❌ |
| Acceder a Documentos Oficiales | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| Acceder a Organigrama | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| Acceder a Notificaciones | ✔️ | ✔️ | ✔️ | ✔️ | ❌ |
| Acceder a Perfil de cuenta | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| Acceder a Usuarios | ✔️ | ❌ | ❌ | ❌ | ❌ |


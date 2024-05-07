import axios from 'axios';

export const getFoldersRequests = async () =>
  await axios.get('http://localhost:3001/folders');

export const createFoldersRequests = async (datos) =>
  await axios.post('http://localhost:3001/folders', datos);

export const editFolderRequests = async (id, datos) =>
  await axios.put('http://localhost:3001/folders/' + id, datos);

export const deleteFolderRequests = async (id) =>
  await axios.delete('http://localhost:3001/folders/' + id);

export const getFolderPermissionsRequests = async () =>
  await axios.get('http://localhost:3001/folders/permissions');

export const createFolderPermissionsRequests = async (datos) =>
  await axios.post('http://localhost:3001/folders/permissions', datos);

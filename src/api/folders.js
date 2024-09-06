import axios from 'axios';

const baseURL = process.env.PUBLIC_API_URL;

export const getFoldersRequests = async () =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/folders`);

export const createFoldersRequests = async (datos) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/folders`, datos);

export const moveFolderRequests = async (id, datos) =>
  await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/folders/${id}`,
    datos
  );

export const deleteFolderRequests = async (id) =>
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/folders/${id}`);

export const getFolderPermissionsRequests = async () =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/folders/permissions`);

export const createFolderPermissionsRequests = async (datos) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/folders/permissions`,
    datos
  );

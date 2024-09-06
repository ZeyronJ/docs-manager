import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
console.log(baseURL);

export const getDocumentsRequests = async () =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/documents`);

export const createDocumentsRequests = async (document) => {
  const form = new FormData();
  for (let key in document) {
    form.append(key, document[key]);
  }
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/documents`,
    form,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
};

export const downloadDocumentRequests = (id) =>
  window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/` + id);

export const moveDocumentsRequests = async (id, datos) =>
  await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/documents/` + id,
    datos
  );

export const deleteDocumentsRequests = async (id) =>
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/` + id);

export const validateDocumentsRequests = async (id, datos) =>
  await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/documents/` + id,
    datos
  );

export const getOficialDocumentsRequests = async () =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/oficiales`);

export const getLocalDocumentsRequests = async (id) =>
  await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/documents/locales/` + id
  );

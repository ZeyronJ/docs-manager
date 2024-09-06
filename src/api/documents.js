import axios from 'axios';

export const getDocumentsRequests = async () =>
  await axios.get('http://localhost:3000/api/documents');

export const createDocumentsRequests = async (document) => {
  const form = new FormData();
  for (let key in document) {
    form.append(key, document[key]);
  }
  return await axios.post('http://localhost:3000/api/documents', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const downloadDocumentRequests = (id) =>
  window.open('http://localhost:3000/api/documents/' + id);

export const moveDocumentsRequests = async (id, datos) =>
  await axios.put('http://localhost:3000/api/documents/' + id, datos);

export const deleteDocumentsRequests = async (id) =>
  await axios.delete('http://localhost:3000/api/documents/' + id);

export const validateDocumentsRequests = async (id, datos) =>
  await axios.patch('http://localhost:3000/api/documents/' + id, datos);

export const getOficialDocumentsRequests = async () =>
  await axios.get('http://localhost:3000/api/documents/oficiales');

export const getLocalDocumentsRequests = async (id) =>
  await axios.get(`http://localhost:3000/api/documents/locales/` + id);

import axios from 'axios';

export const loginRequests = async (datos) =>
  await axios.post('http://localhost:3000/api/auth/login', datos);
export const createUserRequests = async (datos) =>
  await axios.post('http://localhost:3000/api/createUser', datos);
export const getUsersRequests = async () =>
  await axios.get('http://localhost:3000/api/users');
export const deleteUserRequests = async (id) =>
  await axios.delete('http://localhost:3000/api/users/' + id);
export const editUserRequests = async (datos) =>
  await axios.post('http://localhost:3000/api/users/edit', datos);

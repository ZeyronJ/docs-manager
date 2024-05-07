import axios from 'axios';

export const loginRequests = async (datos) =>
  await axios.post('http://localhost:3001/auth/login', datos);
export const createUserRequests = async (datos) =>
  await axios.post('http://localhost:3001/createUser', datos);
export const getUsersRequests = async () =>
  await axios.get('http://localhost:3001/users');
export const deleteUserRequests = async (id) =>
  await axios.delete('http://localhost:3001/users/' + id);
export const editUserRequests = async (datos) =>
  await axios.post('http://localhost:3001/users/edit', datos);

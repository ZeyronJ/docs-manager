import axios from 'axios';

const baseURL = process.env.PUBLIC_API_URL;

export const loginRequests = async (datos) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, datos);

export const createUserRequests = async (datos) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/createUser`, datos);

export const getUsersRequests = async () =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);

export const deleteUserRequests = async (id) =>
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`);

export const editUserRequests = async (datos) =>
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/edit`, datos);

import axios from 'axios';

export const getNotificationsRequests = async () =>
  await axios.get('http://localhost:3000/api/notifications');

export const createNotificationsRequests = async (datos) =>
  await axios.post('http://localhost:3000/api/notifications', datos);

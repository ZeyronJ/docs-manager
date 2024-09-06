import axios from 'axios';

const baseURL = process.env.PUBLIC_API_URL;

export const getNotificationsRequests = async () =>
  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`);

export const createNotificationsRequests = async (datos) =>
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notifications`,
    datos
  );

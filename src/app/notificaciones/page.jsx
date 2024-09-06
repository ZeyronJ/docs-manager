'use client';
import React, { useState, useEffect } from 'react';
import {
  getNotificationsRequests,
  createNotificationsRequests,
} from '@/api/notifications';
import { getUsersRequests } from '@/api/users';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { redirect } from 'next/navigation';

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState({
    sent: [],
    received: [],
  });
  const [newNotification, setNewNotification] = useState({
    recipient: 0,
    message: '',
  });
  const [activeTab, setActiveTab] = useState('sent');
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    if (user.rol === 'funcionario') {
      redirect('/');
    }
    setLoading(true);
    const fetchNotifications = async () => {
      const { data } = await getNotificationsRequests();
      // console.log(data);
      const sent = data.filter((n) => n.owner === user.name);
      // console.log('sent', sent);
      const received = data.filter((n) => n.recipient === user.name);
      // console.log('received', received);
      // console.log('user', user);
      setNotifications({ sent, received });
      setLoading(false);
    };
    const fetchUsers = async () => {
      let { data } = await getUsersRequests();
      data = data.filter((u) => u.rol !== 'funcionario');
      setUsers(data);
    };

    fetchNotifications();
    fetchUsers();
  }, [user]);

  const handleSendNotification = async () => {
    if (newNotification.recipient !== 0 && newNotification.message) {
      const recipient = users.filter((u) => u.id == newNotification.recipient);
      // console.log(recipient);
      const { id, ...notificationWithoutId } = {
        id: Date.now(),
        ...newNotification,
        owner: user.id,
        recipient: recipient[0].name,
      };

      setNotifications((prev) => ({
        ...prev,
        sent: [
          {
            id,
            ...notificationWithoutId,
            created: new Date().toISOString(),
          },
          ...prev.sent,
        ],
      }));

      setNewNotification({ recipient: '', message: '' });
      // console.log('notificationWithoutId', {
      //   ...notificationWithoutId,
      //   recipient: recipient[0].id,
      // });
      const res = await createNotificationsRequests({
        ...notificationWithoutId,
        recipient: recipient[0].id,
      });
      if (res.status !== 200) {
        alert('Error sending notification');
      }
    }
  };

  const NotificationList = ({ notifications, type }) => (
    <div className='space-y-2 overflow-auto xl:max-h-64 2xl:max-h-[35rem]'>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className='bg-white shadow rounded-lg border p-4'
        >
          <div className='text-sm font-medium text-gray-900'>
            {type === 'sent'
              ? `Hacia: ${notification.recipient}`
              : `De: ${notification.owner}`}
          </div>
          <div className='text-xs text-gray-500'>
            {DateTime.fromISO(notification.created).toLocaleString({
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              ...DateTime.DATETIME_MED,
            })}
          </div>
          <p className='mt-2 text-gray-700'>{notification.message}</p>
        </div>
      ))}
    </div>
  );

  const NotificationListSkeleton = () => (
    <div className='space-y-2 overflow-auto xl:max-h-64 2xl:max-h-[35rem]'>
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className='bg-white shadow rounded-lg border p-4 animate-pulse'
        >
          <div className='h-8 bg-gray-300 rounded w-1/3 mb-2'></div>
          <div className='h-8 bg-gray-200 rounded w-full mt-2'></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      {/* <h1 className='text-2xl font-bold mb-6'>Notification Center</h1> */}

      <div className='bg-white shadow rounded-lg p-6 mb-6'>
        <h2 className='text-xl font-semibold mb-4'>Crear Nueva Notificación</h2>
        <div className='space-y-4'>
          <select
            className='w-full p-2 border border-gray-300 rounded-md outline-blue-300'
            value={newNotification.recipient}
            onChange={(e) =>
              setNewNotification((prev) => ({
                ...prev,
                recipient: e.target.value,
              }))
            }
          >
            <option value=''>Selecciona el usuario</option>
            {users
              .filter((u) => u.id !== user.id)
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            {/* <option value='user1@example.com'>user1@example.com</option>
            <option value='user2@example.com'>user2@example.com</option>
            <option value='user3@example.com'>user3@example.com</option> */}
          </select>
          <textarea
            className='w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-blue-300'
            placeholder='Mensaje'
            value={newNotification.message}
            onChange={(e) =>
              setNewNotification((prev) => ({
                ...prev,
                message: e.target.value,
              }))
            }
          />
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors outline-blue-300'
            onClick={handleSendNotification}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className='bg-white shadow rounded-lg border'>
        <div className='flex border-b'>
          <button
            className={`flex-1 text-center py-2 ${
              activeTab === 'sent'
                ? 'font-semibold underline underline-offset-2 decoration-2 decoration-neutral-500 '
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('sent')}
          >
            Enviadas
          </button>
          <button
            className={`flex-1 text-center py-2 ${
              activeTab === 'received'
                ? 'font-semibold underline underline-offset-2 decoration-2 decoration-neutral-500'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('received')}
          >
            Recibidas
          </button>
        </div>
        <div className='p-4'>
          {loading ? (
            <NotificationListSkeleton />
          ) : (
            activeTab === 'sent' && (
              <div>
                <NotificationList
                  notifications={notifications.sent}
                  type='sent'
                />
              </div>
            )
          )}
          {activeTab === 'received' && (
            <div>
              <NotificationList
                notifications={notifications.received}
                type='received'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface Notification {
  id: number;
  text: string;
  read: boolean;
  date: string;
}

interface NotificationsProps {
  unreadNotifications: (count: number) => void;
  notificationsRef: React.RefObject<HTMLDivElement>;
}

const Notifications: React.FC<NotificationsProps> = ({ notificationsRef, unreadNotifications }) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      text: 'Your item has been successfully delivered. Thank you for choosing our service. We hope you enjoy your purchase!',
      read: false,
      date: '2023-10-20T12:34:56Z'
    },
    {
      id: 2,
      text: 'Great news! Your shop has received a lot of visitors this week. Keep up the good work!',
      read: false,
      date: '2023-10-19T10:30:45Z'
    },
    {
      id: 3,
      text: 'New feature alert: Introducing a powerful search functionality to help you find products faster and easier.',
      read: false,
      date: '2023-10-18T08:45:32Z'
    },
    {
      id: 4,
      text: 'We have exciting promotions coming up. Stay tuned for exclusive discounts and special offers!',
      read: true,
      date: '2023-10-17T16:20:15Z'
    },
    {
      id: 5,
      text: 'Thank you for being a valued member of our community. We appreciate your continued support!',
      read: false,
      date: '2023-10-16T14:10:55Z'
    },
    {
      id: 6,
      text: 'Your recent purchase has earned you reward points. You can use them on your next order for great discounts!',
      read: true,
      date: '2023-10-15T12:15:42Z'
    },
    {
      id: 7,
      text: 'Exciting news! Our website is now available in multiple languages to serve you better.',
      read: true,
      date: '2023-10-14T11:05:30Z'
    },
    {
      id: 8,
      text: 'Special offer just for you! Use code SPECIAL10 for an extra 10% off on selected items.',
      read: true,
      date: '2023-10-13T09:40:25Z'
    },
    {
      id: 9,
      text: 'We are thrilled to announce our new collection. Explore the latest trends in fashion and style!',
      read: false,
      date: '2023-10-12T07:55:20Z'
    },
    {
      id: 10,
      text: 'Don\'t miss out! Limited stock available on our best-selling products. Grab yours now!',
      read: true,
      date: '2023-10-11T05:30:10Z'
    },
    {
      id: 11,
      text: 'Thank you for your feedback. Your input helps us improve our services for a better experience!',
      read: true,
      date: '2023-10-10T03:25:05Z'
    },
    {
      id: 12,
      text: 'New arrivals alert! Discover the hottest trends in fashion. Shop now and stay ahead of the curve!',
      read: false,
      date: '2023-10-09T01:15:00Z'
    }
  ]);
  ;

  useEffect(() => {
    const unreadCount = notifications.filter(notification => !notification.read).length;
    unreadNotifications(unreadCount);
  }, [notifications, unreadNotifications]);

  const markAsRead = (id: number) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      );
      return updatedNotifications;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`w-[25em] bg-white-100 h-[60vh] z-50 overflow-y-scroll rounded shadow-lg ${loading ? 'animate-pulse' : ''}`}
    // ref={notificationsRef}
    >
      <div className="py-2 bg-white-100 sticky top-0 flex flex-col justify-between">
        
        
      <input
        type="text"
        placeholder="Search notifications..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="border border-brand-green-primary outline:border-[1.2px] p-2 mb-4"
      />
        <button onClick={markAllAsRead} className="bg-white-100 w-fit float-right text-green-400 font-semibold rounded hover:bg-green-200 ">Mark All as Read</button>
      </div>
      <ul className='flex flex-col'>
        {filteredNotifications.map(notification => (
          <li 
            key={notification.id}
            className={`py-4 px-4 flex items-start justify-between border-b ${notification.read ? 'text-gray-700' : 'bg-[#00000021] text-white'}`}
          >
            <div className="flex flex-col">
              <p className='font-[400] mb-2'>
                {notification.text}
              </p>
              <p className='text-gray-600 text-sm'>
                {new Date(notification.date).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center">
              {!notification.read && (
                <div className="flex items-center">
                  <FaCheckCircle onClick={() => markAsRead(notification.id)} className="text-green-500 cursor-pointer mr-2" />
                </div>
              )}
              <FaTimesCircle onClick={() => removeNotification(notification.id)} className="text-red-500 cursor-pointer" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

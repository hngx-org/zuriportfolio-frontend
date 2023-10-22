import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Image from 'next/image';
interface Notification {
  id: number;
  text: 'Good news!, Your order has been shipped and is on its way',
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

  const timeAgo = (dateString: string): string => {
    const now: Date = new Date(); 
    const date = new Date(dateString);
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 1) return `${days} days ago`;
    if (days === 1) return '1 day ago';
    if (hours > 1) return `${hours} hours ago`;
    if (hours === 1) return '1 hour ago';
    if (minutes > 1) return `${minutes} minutes ago`;
    if (minutes === 1) return '1 minute ago';
    if (seconds > 1) return `${seconds} seconds ago`;
    return 'just now';
  };
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: false,
      date: '2023-10-20T12:34:56Z'
    },
    {
      id: 2,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: false,
      date: '2023-10-19T10:30:45Z'
    },
    {
      id: 3,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: false,
      date: '2023-10-18T08:45:32Z'
    },
    {
      id: 4,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: true,
      date: '2023-10-17T16:20:15Z'
    },
    {
      id: 5,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: false,
      date: '2023-10-16T14:10:55Z'
    },
    {
      id: 6,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: true,
      date: '2023-10-15T12:15:42Z'
    },
    {
      id: 7,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: true,
      date: '2023-10-14T11:05:30Z'
    },
    {
      id: 8,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: true,
      date: '2023-10-13T09:40:25Z'
    },
    {
      id: 9,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: false,
      date: '2023-10-12T07:55:20Z'
    },
    {
      id: 10,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: true,
      date: '2023-10-11T05:30:10Z'
    },
    {
      id: 11,
      text: 'Good news!, Your order has been shipped and is on its way',
      read: true,
      date: '2023-10-10T03:25:05Z'
    },
    {
      id: 12,
      text: 'Good news!, Your order has been shipped and is on its way',
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
    <div className={`bg-[#fff] font-manropeEL w-full h-[60vh] z-[20000] border-[#d8d8d8] overflow-y-scroll scrollbar-none rounded-lg shadow-xl ${loading ? '' : ''}`}
    ref={notificationsRef}
    >
      <div className="py-2 bg-white-100 px-4 sticky top-0 flex flex-col justify-between">
        <h1 className="font-[600]">Notifications</h1>
        
     
      </div>
      <ul className='flex flex-col w-full flex-wrap'>
        {filteredNotifications.map(notification => (
          <li 
            key={notification.id}
            className={`h-fit py-4 flex px-4 flex-col border-b ${notification.read ? '' : 'text-white'}`}
          >
            <div className="flex w-full gap-4 m-auto items-center justify-center align-middle">

            <div className="m-auto bg-brand-green-primary w-fit p-2 rounded-full">
              <Image src="/boxnotify.svg" alt="icon" width={30} height={40} />
            </div>
            <div className="flex m-auto items-center gap-2 justify-center w-full flex-col">
              <p className='font-[400] text-[#5B5F5E] text-sm '>
                {notification.text}
              </p>
              <p className='text-gray-600  w-full float-left text-sm text-left justify-start items-start align-baseline'>
              {timeAgo(notification.date)}
              </p>
            </div>
            </div>
         
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

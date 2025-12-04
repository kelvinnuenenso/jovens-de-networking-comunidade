import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Bem-vindo!',
    message: 'Seja bem-vindo à Fábrica de Views!',
    is_read: false,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Nova aula disponível',
    message: 'Uma nova aula foi adicionada ao curso de edição.',
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [loading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(mockNotifications.filter(n => !n.is_read).length);
  const { user } = useAuth();

  const markAsRead = async (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch: () => {}
  };
};

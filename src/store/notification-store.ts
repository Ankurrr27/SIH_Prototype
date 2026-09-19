import { create } from 'zustand';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

interface NotificationState {
  unreadCount: number;
  notifications: NotificationItem[];
  setNotifications: (items: NotificationItem[], unread: number) => void;
  markReadLocally: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  notifications: [],

  setNotifications: (items, unread) =>
    set({
      notifications: items,
      unreadCount: unread,
    }),

  markReadLocally: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
}));

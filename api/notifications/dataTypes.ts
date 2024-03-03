export interface NotificationEntity {
  name: string | null;
  id: string | null;
  url: string | null;
  avatar: string | null;
  slug?: string | null;
  username?: string | null;
}

export interface NotificationObj {
  id: string;
  url: string | null;
  visibility: boolean;
  enrollmentId: string;
  category: string | null;
  target: string | null;
  type: string;
  declineUrl: string | null;
  acceptUrl: string | null;
  subject: NotificationEntity | null;
  object: NotificationEntity | null;
  message: string;
  isRead: boolean;
  createdAt: string | null;
}

interface ServerNotificationEntity {
  name: string | null;
  url: string | null;
  avatar: string | null;
  id: string | null;
  slug?: string | null;
  username?: string | null;
}

export interface ServerNotificationObj {
  id: string;
  url: string | null;
  visibility: string | null;
  enrollment_id: string;
  category: string;
  target: string;
  type: string;
  decline_url: string | null;
  accept_url: string | null;
  message: string;
  created_at: string;
  subject?: ServerNotificationEntity;
  object?: ServerNotificationEntity;
  read_at: string | null;
}

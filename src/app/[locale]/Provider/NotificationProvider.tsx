"use client";

import { App, ConfigProvider, notification } from "antd";
import React, { ReactNode, createContext } from "react";

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationContext = createContext(notification);
/**
 * Notification provider
 ** Wrap your container with this provider to use the notification context
 ** NotificationProvider documentation -> go to docs/how-to-use-notificationProvider.md
 */

export default function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={api}>
      <ConfigProvider>
        <App>
          {contextHolder}
          {children}
        </App>
      </ConfigProvider>
    </NotificationContext.Provider>
  );
}

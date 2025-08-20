'use client';

import useAuthStore from '@/store/authStore';
import { DialogProvider } from 'p2p-ui';
import React, { PropsWithChildren, useEffect } from 'react';

export const Providers = ({ children }: PropsWithChildren) => {
  const { logout } = useAuthStore();

  useEffect(() => {
    const handleBeforeUnload = () => {
      logout();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <DialogProvider>{children}</DialogProvider>
    </>
  );
};

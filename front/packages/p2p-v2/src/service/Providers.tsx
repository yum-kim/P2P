'use client';

import useAuthStore from '@/store/authStore';
import { DialogProvider } from 'p2p-ui';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      }),
  );
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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <DialogProvider>{children}</DialogProvider>
      </QueryClientProvider>
    </>
  );
};

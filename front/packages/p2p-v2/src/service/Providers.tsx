'use client';

import { DialogProvider } from 'p2p-ui';
import React, { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DialogProvider>{children}</DialogProvider>
    </>
  );
};

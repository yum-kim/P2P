'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  // const { login, isLoggedIn } = useAuthStore();

  useEffect(() => {
    router.push('/feed');
  }, []);

  return <div></div>;
}

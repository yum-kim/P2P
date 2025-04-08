//메인 피드 화면
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { RootState } from '../store/configureStore';

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/feed');
    } else {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>P2P | main</title>
      </Head>
    </>
  );
};

export default Home;

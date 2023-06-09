//메인 피드 화면
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Login from './login';
import Feed from './feed';
import { RootState } from '../store/reducers';

const Home = () => {
    const { logInDone } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <Head>
                <title>P2P | main</title>
            </Head>
            {logInDone ? <Feed /> : <Login />}
        </>
    );
}

export default Home;
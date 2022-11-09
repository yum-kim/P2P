//메인 피드 화면

import React from 'react';
import Head from 'next/head';
import AppLayout from "../components/AppLayout";

const Home = () => {
    return (
        <>
            <Head>
                <title>P2P | main</title>
            </Head>
            <AppLayout>
                <div>메인 피드 페이지</div>
            </AppLayout>
        </>
    );
}

export default Home;
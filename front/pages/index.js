//메인 피드 화면
import React from 'react';
import Head from 'next/head';
import AppLayout from "../components/layout/AppLayout";
import Card from '../components/Card';

const Home = () => {
    return (
        <>
            <Head>
                <title>P2P | main</title>
            </Head>
            <AppLayout>
                <div>
                    <Card
                        name='yumi'
                        profileURL='/images/myProfile.jpeg'
                        fileURL='/images/next.png'
                        date='2022.11.11 00:12:12'
                    >
                        next 쉽지않다 어렵도다ㄴ
                        살려줘ㅓㅓ
                    </Card>
                    <Card
                        name='jemin'
                        profileURL='/images/profile.png'
                        date='2022.11.10 12:00:00'
                    >
                        오늘부터 부지런한 생활을 할테야!
                    </Card>
                    
                </div>
            </AppLayout>
        </>
    );
}

export default Home;
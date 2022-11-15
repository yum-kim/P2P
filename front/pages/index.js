//메인 피드 화면
import React from 'react';
import Head from 'next/head';
import AppLayout from "../components/layout/AppLayout";
import PostCard from '../components/component/PostCard';
import PostForm from '../components/component/PostForm';

const Home = () => {

    return (
        <>
            <Head>
                <title>P2P | main</title>
            </Head>
            <AppLayout>
                <div>
                    <PostForm />
                    <PostCard
                        name='yumi'
                        profileURL='/images/myProfile.jpeg'
                        fileURL='/images/next.png'
                        date='2022.11.11 00:12:12'
                    >
                        next 쉽지않다 어렵도다ㄴ
                        살려줘ㅓㅓ
                    </PostCard>
                    <PostCard
                        name='jemin'
                        profileURL='/images/profile.png'
                        date='2022.11.10 12:00:00'
                    >
                        오늘부터 부지런한 생활을 할테야!
                    </PostCard>
                    
                </div>
            </AppLayout>
        </>
    );
}

export default Home;
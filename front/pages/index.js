//메인 피드 화면
import React from 'react';
import Head from 'next/head';
import AppLayout from "../components/layout/AppLayout";
import PostCard from '../components/component/PostCard';
import PostForm from '../components/component/PostForm';
import { useSelector } from 'react-redux';
import Message from '../components/component/Message';

const Home = () => {
    const { mainPosts } = useSelector((state) => state.post);

    return (
        <>
            <Head>
                <title>P2P | main</title>
            </Head>
            <AppLayout>
                <div>
                    <PostForm />
                    {mainPosts.map((v) => (
                        <PostCard
                            name={v.user.nickname}
                            profileURL={v.user.profileImagePath}
                            fileURL={v.imagePath}
                            date={v.postDate}
                            >
                            {v.content}
                        </PostCard>
                    ))}
                </div>
            </AppLayout>
        </>
    );
}

export default Home;
//메인 피드 화면
import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from "../components/layout/AppLayout";
import PostCard from '../components/component/PostCard';
import PostForm from '../components/component/PostForm';
import { useSelector } from 'react-redux';
import Login from './login';

const Home = () => {
    const { mainPosts } = useSelector((state) => state.post);
    const { isLoggedIn } = useSelector((state) => state.user);

    return (
        <>
            <Head>
                <title>P2P | main</title>
            </Head>
            {isLoggedIn ?
            <AppLayout>
                    <div>
                        <PostForm />
                        {mainPosts.map((post) => (
                            <PostCard key={post.postId} post={post} />
                        ))}
                    </div>
            </AppLayout>
            : <Login />
            }
        </>
    );
}

export default Home;
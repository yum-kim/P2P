import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import PostForm from '../../components/component/PostForm';
import PostCard from '../../components/component/PostCard';

const Feed = () => {
    const { mainPosts } = useSelector((state) => state.post);

    return (
        <>
            <Head>
                <title>P2P | feed</title>
            </Head>
            <AppLayout>
                <div>
                    <PostForm />
                    {mainPosts.map((post) => (
                        <PostCard key={post.postId} post={post} />
                    ))}
                </div>
            </AppLayout>

        </>
    );
};

export default Feed;
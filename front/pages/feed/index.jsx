import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout';
import PostForm from '../../components/component/PostForm';
import PostCard from '../../components/component/PostCard';
import Loading from '../../components/common/Loading/Loading';
import { getPostsRequestAction } from '../../store/actions/post';

const Feed = () => {
    const { getPostsLoading, getPostsDone, getPostsError, allPosts } = useSelector((state) => state.post);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    console.log(allPosts)

    const getPosts = () => {
        dispatch(getPostsRequestAction({ page: currentPage }));
    }

    useEffect(() => {
        if (getPostsError) {
            alert("게시물을 불러오는 중 오류가 발생했습니다.");
        }
    }, [getPostsError]);

    useEffect(() => {
        getPosts();
    }, [currentPage]);

    return (
        <>
            <Head>
                <title>P2P | feed</title>
            </Head>
            <AppLayout>
                {getPostsLoading && <Loading />}
                <PostForm />
                {allPosts?.map((post) => (
                    <PostCard key={post.postId} post={post} />
                ))}
            </AppLayout>
        </>
    );
};

export default Feed;
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import PostForm from '../../components/component/PostForm/PostForm';
import PostCard from '../../components/component/PostCard/PostCard';
import Loading from '../../components/common/Loading/Loading';
import { getPostsRequestAction } from '../../store/actions/post';
import { RootState } from '../../store/reducers';
import { useRouter } from 'next/dist/client/router';
import Modal from '../../components/layout/Modal/Modal';

const Feed = () => {
    const {
        allPosts, getPostsLoading, getPostsError,
        addPostLoading, addPostDone, addPostError,
        addCommentLoading, addCommentDone, addCommentError,
        deletePostLoading, deletePostDone, deletePostError,
        changePostStatusLoading, changePostStatusDone, changePostStatusError
    } = useSelector((state: RootState) => state.post);
    const { user } = useSelector((state: RootState) => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isShowModal, setIsShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    console.log('allPosts', allPosts);

    const getPosts = () => {
        dispatch(getPostsRequestAction({ page: currentPage }));
    }

    useEffect(() => {
        if (addPostDone) {
            setIsShowModal(true);
            setModalContent("업로드가 완료되었습니다.");
            getPosts();
        }
    }, [addPostDone])

    useEffect(() => {
        if (deletePostDone) {
            setIsShowModal(true);
            setModalContent("삭제가 완료되었습니다.");
        }
    }, [deletePostDone])

    useEffect(() => {
        if (changePostStatusDone) {
            setIsShowModal(true);
            setModalContent("게시물 공개범위 수정이 완료되었습니다.");
        }
    }, [changePostStatusDone])

    useEffect(() => {
        if (getPostsError || addCommentError || deletePostError || changePostStatusError) {
            setIsShowModal(true);
            setModalContent("데이터 통신 중 오류가 발생했습니다.");
        }
    }, [getPostsError, addCommentError, deletePostError, changePostStatusError])

    useEffect(() => {
        getPosts();
    }, [currentPage]);

    useEffect(() => {
        if (!user) {
            router.push('/');
            return null;
        }
    }, []);

    return (
        <>
            <Head>
                <title>P2P | feed</title>
            </Head>
            <AppLayout>
                {getPostsLoading && <Loading />}
                {isShowModal &&
                    <Modal setIsShowModal={setIsShowModal}>
                        <p>{modalContent}</p>
                    </Modal>
                }

                <PostForm />
                {allPosts?.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </AppLayout>
        </>
    );
};

export default Feed;
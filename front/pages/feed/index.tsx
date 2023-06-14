import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import PostForm from '../../components/component/PostForm/PostForm';
import PostCard from '../../components/component/PostCard/PostCard';
import Loading from '../../components/common/Loading/Loading';
import { RootState } from '../../store/configureStore';
import { useRouter } from 'next/dist/client/router';
import useModal from '../../hooks/useModal';
import styles from './feed.module.scss';
import { getPostsRequest } from '../../store/slices/post';

const Feed = () => {
    const {
        allPosts, allPostsCnt,
        getPostsLoading, getPostsError,
        addPostLoading, addPostDone, addPostError,
        updatePostLoading, updatePostDone, updatePostError,
        addCommentLoading, addCommentDone, addCommentError,
        updatePostHeartLoading, updatePostHeartDone, updatePostHeartError,
        updateCommentLoading, updateCommentDone, updateCommentError,
        deleteCommentLoading, deleteCommentDone, deleteCommentError,
        deletePostLoading, deletePostDone, deletePostError,
        changePostStatusLoading, changePostStatusDone, changePostStatusError,
        modalMessage,
    } = useSelector((state: RootState) => state.post);
    const { user } = useSelector((state: RootState) => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();
    const { Modal, onShowModal, onCloseModal, modalContent, setModalContent } = useModal(false);

    console.log('allPosts', allPosts);

    const getPosts = () => {
        dispatch(getPostsRequest({ page: currentPage, size: 10, sortColumn: "createAt", orderby: "DESC" }));
    }

    const completeMsgMap = {
        addPostDone,
        deletePostDone,
        changePostStatusDone,
        updatePostDone,
    }

    useEffect(() => {
        const doneStates = Object.keys(completeMsgMap).filter((key) => completeMsgMap[key]);
        if (doneStates.length > 0) {
            onShowModal();
            setModalContent(`${modalMessage}이(가) 완료되었습니다.`);
        }
    }, Object.values(completeMsgMap))

    const errMsgMap = {
        getPostsError,
        addPostError,
        addCommentError,
        changePostStatusError,
        updatePostHeartError,
        updatePostError,
        updateCommentError,
        deleteCommentError
    }

    useEffect(() => {
        const doneStates = Object.keys(errMsgMap).filter((key) => errMsgMap[key]);
        const errMsg = doneStates.length > 0 && errMsgMap[doneStates[0]].message;

        if (errMsg) {
            onShowModal();
            setModalContent(`${errMsg}`);
        }
    }, Object.values(errMsgMap))

    useEffect(() => {
        getPosts();
    }, [currentPage]);

    return (
        <>
            <Head>
                <title>P2P | feed</title>
            </Head>
            <AppLayout>
                {(getPostsLoading || addPostLoading || addCommentLoading || updateCommentLoading || deleteCommentLoading || deletePostLoading || changePostStatusLoading || updatePostHeartLoading || updatePostLoading) && <Loading />}
                <Modal
                    onCloseModal={onCloseModal}>
                    <p>{modalContent}</p>
                </Modal>

                <PostForm />
                {allPostsCnt == 0 && <p className={styles.cnt}>등록된 게시물이 없어요.🥲</p>}
                {allPosts?.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </AppLayout>
        </>
    );
};

export default Feed;
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
import useModal from '../../hooks/useModal';
import styles from './feed.module.scss';

interface IPostParams {
    description?: string,
    sortColumn?: "createAt",
    orderby?: "ASC" | "DESC",
    page: number,
    size: number
}

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
        changePostStatusLoading, changePostStatusDone, changePostStatusError
    } = useSelector((state: RootState) => state.post);
    const { user } = useSelector((state: RootState) => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();
    const { Modal, onShowModal, onCloseModal, modalContent, setModalContent } = useModal(false);

    console.log('allPosts', allPosts);

    const getPosts = () => {
        const params: IPostParams = {
            page: currentPage,
            size: 10,
            sortColumn: "createAt",
            orderby: "DESC"
        }
        dispatch(getPostsRequestAction(params));
    }

    useEffect(() => {
        let completeMsg = '';
        if (addPostDone || deletePostDone || changePostStatusDone || updatePostDone) {
            onShowModal();

            if (addPostDone) {
                completeMsg = "업로드";
            } else if (deletePostDone) {
                completeMsg = "삭제";
            } else if (changePostStatusDone) {
                completeMsg = "게시물 공개범위 수정";
            } else if (updatePostDone) {
                completeMsg = "게시물 수정";
            }

            setModalContent(`${completeMsg}이(가) 완료되었습니다.`);
        }
    }, [addPostDone, deletePostDone, changePostStatusDone, updatePostDone])

    useEffect(() => {
        let errMsg = '';
        if (getPostsError || addPostError || addCommentError || deletePostError || changePostStatusError || updatePostHeartError || updatePostError || updateCommentError || deleteCommentError) {
            onShowModal();
            
            if (getPostsError) {
                errMsg = getPostsError.message;
            } else if (addPostError) {
                errMsg = addPostError.message;
            } else if (addCommentError) {
                errMsg = addCommentError.message;
            } else if (deletePostError) {
                errMsg = deletePostError.message;
            } else if (changePostStatusError) {
                errMsg = changePostStatusError.message;
            } else if (updatePostHeartError) {
                errMsg = updatePostHeartError.message;
            } else if (updatePostError) {
                errMsg = updatePostError.message;
            } else if (updateCommentError) {
                errMsg = updateCommentError.message;
            } else if (deleteCommentError) {
                errMsg = deleteCommentError.message;
            }

            setModalContent(errMsg);
        }

    }, [getPostsError, addPostError, addCommentError, deletePostError, changePostStatusError, updatePostHeartError, updateCommentError, deleteCommentError])

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
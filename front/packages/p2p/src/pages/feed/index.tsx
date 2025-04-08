import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import PostForm from '../../components/component/PostForm/PostForm';
import PostCard from '../../components/component/PostCard/PostCard';
import Loading from '../../components/common/Loading/Loading';
import { RootState } from '../../store/configureStore';
import useModal from '../../hooks/useModal';
import styles from './feed.module.scss';
import { getPostsRequest } from '../../store/slices/post';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { resetAllPostDone, resetAllPostError } from '../../store/slices/post';
import { useRouter } from 'next/router';
import { connetSocketRequest } from '../../store/slices/socket';

const Feed = () => {
  const {
    allPosts,
    fetchedPosts,
    getPostsLoading,
    getPostsDone,
    getPostsError,
    addPostLoading,
    addPostDone,
    addPostError,
    updatePostLoading,
    updatePostDone,
    updatePostError,
    addCommentLoading,
    addCommentDone,
    addCommentError,
    updatePostHeartLoading,
    updatePostHeartDone,
    updatePostHeartError,
    updateCommentLoading,
    updateCommentDone,
    updateCommentError,
    deleteCommentLoading,
    deleteCommentDone,
    deleteCommentError,
    deletePostLoading,
    deletePostDone,
    deletePostError,
    changePostStatusLoading,
    changePostStatusDone,
    changePostStatusError,
    cursor,
    modalMessage,
  } = useSelector((state: RootState) => state.post);
  const { user, expireRefreshTokenError } = useSelector((state: RootState) => state.auth);
  const [isLastPage, setIsLastPage] = useState(false);
  const dispatch = useDispatch();
  const { Modal, onShowModal } = useModal(false);
  const intersectingRef = useRef(null);
  const { isIntersecting } = useInfiniteScroll(intersectingRef, { threshold: 0.3 });
  const router = useRouter();
  const { socket } = useSelector((state: RootState) => state.socket);

  const isLoading =
    getPostsLoading ||
    addPostLoading ||
    addCommentLoading ||
    updateCommentLoading ||
    deleteCommentLoading ||
    deletePostLoading ||
    changePostStatusLoading ||
    updatePostHeartLoading ||
    updatePostLoading;

  const completeMsgMap = {
    addPostDone,
    deletePostDone,
    changePostStatusDone,
    updatePostDone,
  };

  useEffect(() => {
    const doneStates = Object.keys(completeMsgMap).filter((key) => completeMsgMap[key]);
    if (doneStates.length > 0 && modalMessage) {
      onShowModal(`${modalMessage}이(가) 완료되었습니다.`, {
        cancel: () => {
          dispatch(resetAllPostDone());
        },
      });
    }
  }, Object.values(completeMsgMap));

  const errMsgMap = {
    getPostsError,
    addPostError,
    addCommentError,
    changePostStatusError,
    updatePostHeartError,
    updatePostError,
    updateCommentError,
    deleteCommentError,
  };

  useEffect(() => {
    const doneStates = Object.keys(errMsgMap).filter((key) => errMsgMap[key]);
    const errMsg = doneStates.length > 0 && errMsgMap[doneStates[0]].message;

    if (errMsg) {
      onShowModal(`${errMsg}`, {
        cancel: () => {
          dispatch(resetAllPostError());
        },
      });
    }
  }, Object.values(errMsgMap));

  const getPosts = () => {
    // if (!cursor && fetchedPosts.length > 0) return;
    dispatch(getPostsRequest({ cursor, size: 10, sortColumn: 'createAt', orderby: 'DESC' }));
  };

  useEffect(() => {
    if (getPostsDone && fetchedPosts.length === 0) setIsLastPage(true);
  }, [getPostsDone]);

  useEffect(() => {
    if (!getPostsLoading && isIntersecting && !isLastPage) getPosts();
  }, [isIntersecting, isLastPage]);

  useEffect(() => {
    dispatch(connetSocketRequest());
    getPosts();
  }, []);

  useEffect(() => {
    if (expireRefreshTokenError) {
      router.push('/login');
    }
  }, [expireRefreshTokenError]);

  return (
    <>
      <Head>
        <title>P2P | feed</title>
      </Head>
      <AppLayout>
        {isLoading && <Loading />}
        <Modal />

        <PostForm />
        {allPosts.length == 0 && <p className={styles.cnt}>등록된 게시물이 없어요.🥲</p>}
        {allPosts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        <div ref={intersectingRef}></div>
      </AppLayout>
    </>
  );
};

export default Feed;

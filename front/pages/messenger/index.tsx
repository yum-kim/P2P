//메인 피드 화면
import React, { useCallback, useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import AppLayout from "../../components/layout/AppLayout/AppLayout";
import MessageList from '../../components/component/MessageList/MessageList';
import styles from './messenger.module.scss';
import MessageRoom from '../../components/component/MessageRoom/MessageRoom';
import useModal from '../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { getChatListRequest, updateCurrentChatUserRequest } from '../../store/slices/chat';
import Loading from '../../components/common/Loading/Loading';

const message = () => {
    const { Modal, onShowModal } = useModal(false);
    const [isShowMsgRoom, setIsShowMsgRoom] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const { chatList, getChatListLoading, getChatListError, getChatListDone, currentChatUser } = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1200);
        };

        window.addEventListener('resize', handleResize);
        currentChatUser && setCurrentUser(currentChatUser); //프로필 모달에서 진입 시

        return () => {
            window.removeEventListener('resize', handleResize);
            currentChatUser && dispatch(updateCurrentChatUserRequest(null));
        };
    }, []);

    const onCloseMessageRoom = useCallback(() => {
        setIsShowMsgRoom(false);
        setCurrentUser(null);
    }, []);

    const onClickMessageList = useCallback((user) => {
        setCurrentUser(user);
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            setIsShowMsgRoom(true);
        } else {
            setIsShowMsgRoom(false);
        }
    }, [currentUser]);

    const getChatList = useCallback(() => {
        dispatch(getChatListRequest());
    }, []);

    useEffect(() => {
        getChatList();
        setIsDesktop(window.innerWidth > 1200);
    }, []);

    return (
        <>
            <Head>
                <title>P2P | Message</title>
            </Head>
            <AppLayout>
                <Modal />
                {getChatListLoading && <Loading />}

                <div className={styles.messenger}>
                    {(isDesktop || (!isDesktop && !isShowMsgRoom)) && (
                        <div className={styles.messageList}>
                            <ul>
                                {chatList.map((message) => (
                                    <MessageList
                                        key={message.id}
                                        message={message}
                                        onClick={onClickMessageList}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}
                    {isShowMsgRoom && (
                        <div className={`${styles.messageRoom}`}>
                            <MessageRoom
                                targetUser={currentUser}
                                onClose={onCloseMessageRoom}
                            />
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}

export default message;
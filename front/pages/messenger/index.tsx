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

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onCloseMessageRoom = useCallback(() => {
        setIsShowMsgRoom(false);
        dispatch(updateCurrentChatUserRequest(null));
    }, []);

    const onClickMessageList = useCallback(() => {
        setIsShowMsgRoom(true);
    }, []);

    const getChatList = useCallback(() => {
        dispatch(getChatListRequest());
    }, []);

    useEffect(() => {
        if (!currentChatUser) return;
        setIsShowMsgRoom(true);
    }, [currentChatUser]);

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
                                        key={message.user_username}
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
//메인 피드 화면
import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import AppLayout from "../../components/layout/AppLayout/AppLayout";
import MessageList from '../../components/component/MessageList/MessageList';
import styles from './messenger.module.scss';
import MessageRoom from '../../components/component/MessageRoom/MessageRoom';
import useModal from '../../hooks/useModal';
import Slider from '../../components/common/Slider/Slider';

const message = () => {
    const { Modal, onShowModal } = useModal(false);
    const [isShowMsgRoom, setIsShowMsgRoom] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1200);

    const messageList = [
        {
            id: 1,
            user: {
                id: 1,
                username: 'yumi',
                usercode: '윰',
                profileImgPath: '',
            },
            lastMessage: '나중에 만나용',
            createAt: '11:15 PM'
        }
    ]

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
    }, []);

    const onClickMessageList = useCallback(() => {
        setIsShowMsgRoom(true);
    }, []);

    return (
        <>
            <Head>
                <title>P2P | Message</title>
            </Head>
            <AppLayout>
                <Modal />
                <div className={styles.messenger}>
                    {(isDesktop || (!isDesktop && !isShowMsgRoom)) && (
                        <div className={styles.messageList}>
                            <ul>
                                {messageList.map((msg) => (
                                    <MessageList key={msg.id} onClickMessageList={onClickMessageList} />
                                ))}
                            </ul>
                        </div>
                    )}
                    {isShowMsgRoom && (
                        <div className={`${styles.messageRoom}`}>
                            <MessageRoom onClose={onCloseMessageRoom} />
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}

export default message;
//메인 피드 화면
import React, { useCallback } from 'react';
import Head from 'next/head';
import AppLayout from "../../components/layout/AppLayout/AppLayout";
import MessageList from '../../components/component/MessageList/MessageList';
import styles from './messenger.module.scss';
import MessageRoom from '../../components/component/MessageRoom/MessageRoom';
import useModal from '../../hooks/useModal';

const message = () => {
    const { Modal, onShowModal } = useModal(false);
    const onClickMessage = useCallback(() => {
        onShowModal("미구현 상태입니다!");
    }, []);

    return (
        <>
            <Head>
                <title>P2P | Message</title>
            </Head>
            <AppLayout>
                <Modal />
                <div onClick={onClickMessage}>
                    <div className={styles.message}>
                        <h2>Recent message</h2>
                        <ul className={styles.messageList}>
                            <MessageList />
                        </ul>
                    </div>
                    <div className={styles.messageRoom}>
                        <MessageRoom />
                    </div>
                </div>
            </AppLayout>
        </>
    );
}

export default message;
//메인 피드 화면
import React from 'react';
import Head from 'next/head';
import AppLayout from "../../components/layout/AppLayout/AppLayout";
import MessageList from '../../components/component/MessageList/MessageList';
import styles from './messenger.module.scss';
import MessageRoom from '../../components/component/MessageRoom/MessageRoom';

const message = () => {
    return (
        <>
            <Head>
                <title>P2P | Message</title>
            </Head>
            <AppLayout>
                <div className={styles.messenger}>
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
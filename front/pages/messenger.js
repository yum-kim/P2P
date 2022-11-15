//메인 피드 화면
import React from 'react';
import Head from 'next/head';
import AppLayout from "../components/layout/AppLayout";
import Message from '../components/component/Message';
import styles from './messenger.module.scss';

const message = () => {

    return (
        <>
            <Head>
                <title>P2P | Message</title>
            </Head>
            <AppLayout>
                <div className={styles.messenger}>
                    <h2>Recent message</h2>
                    <div className={styles.message}>
                        <ul>
                            <Message />
                        </ul>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}

export default message;
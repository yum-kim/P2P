//메인 피드 화면
import React, { useCallback, useState } from 'react';
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

    const onCloseMessageRoom = useCallback(() => {
        console.log('닫아');
        setIsShowMsgRoom(false);
    }, []);

    const onClickMessageList = useCallback(() => {
        // onShowModal("미구현 상태입니다!");
        setIsShowMsgRoom(true);
    }, []);

    console.log('isShowMsgRoom', isShowMsgRoom);

    return (
        <>
            <Head>
                <title>P2P | Message</title>
            </Head>
            <AppLayout>
                <Modal />
                <div className={styles.messenger}>
                    <div className={styles.messageList}>
                        {/* <h2>Recent message</h2> */}
                        <ul>
                            {messageList.map((msg) => (
                                <MessageList key={msg.id} onClickMessageList={onClickMessageList} />
                            ))}
                        </ul>
                    </div>
                    <div className={styles.messageRoom}>
                        <Slider visible={isShowMsgRoom} options={{ direction: 'right', top: '0px' }}>
                            <MessageRoom onClose={onCloseMessageRoom} />
                        </Slider>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}

export default message;
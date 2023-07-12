import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './MessageRoom.module.scss';
import useSocket from '../../../hooks/useSocket';
import Input from '../../element/Input/Input';
import {  BsSend, BsFillPersonFill, BsThreeDots, BsArrowLeft, BsArrowLeftShort } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import useInput from '../../../hooks/useInput';
import MessageList from '../MessageList/MessageList';
import Profile from '../../common/Profile/Profile';

interface IMessage {
    id: number,
    chatMessage: string,
    sendUserId: number,
    receiveUserId: number,
    createAt: string,
    updatedAt?: string,
    deleteAt?: string
}

const MessageRoom = ({ onClose }) => {
    const { socket } = useSocket();
    const [lastMessage, setLastMessage] = useState(null);
    const { user } = useSelector((state: RootState) => state.auth);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const messageEndRef = useRef< HTMLDivElement | null>(null);
    const [message, onChangeMessage, setMessage] = useInput('');
    const [messageList, setMessageList] = useState([1]);

    const onSubmitMessage = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessageList((prev) => [...prev, message]);
        setMessage('');
        setLastMessage(message);
    }, [message]);
    
    useEffect(() => {
        messageEndRef?.current.scrollIntoView({ behavior: 'smooth' });
    }, [lastMessage]);

    useEffect(() => {
        console.log(socket?.connected);

        if (!socket?.connected) {
            console.log('나 채팅창인데, 소켓 연결 안되어있음!');
        }

        socket?.on('message', (message) => {
            setLastMessage(message);
        });


    }, [socket]);

    useEffect(() => {
        inputRef?.current.focus();
    }, []);


    return (
        <section className={styles.messageRoom}>
            <article className={styles.top}>
                <div>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <BsArrowLeftShort />
                    </button>
                    <div className={styles.profile}>
                        <Profile user={user} />                  
                    </div>
                    <div className={styles.name}>
                        <h3 className={styles.usercode}>미나링</h3>
                        <span className={styles.username}>Mina</span>
                    </div>
                    <button className={styles.dotsBtn}>
                        <BsThreeDots />
                    </button>
                </div>
            </article>
            <article className={styles.content}>
                {messageList.map((message) => (
                    <div className={`${styles.textBox} ${styles.sended}`}>
                        <div className={styles.profile}>
                            {user && user.profileImagePath ? <img src={user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />}
                        </div>
                        <div className={styles.message}>
                            <p className={`${styles.ballon}`}>{message}</p>
                            <span className={styles.time}>11:00</span>
                        </div>
                    </div>
                ))}

                <div ref={messageEndRef}></div>
                {/* <div className={`${styles.textBox} ${styles.received}`}>
                    <div className={styles.profile}>
                        {user && user.profileImagePath ? <img src={user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />}
                    </div>
                    <div className={styles.message}>
                        <p className={`${styles.ballon}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit facere sint nobis, deleniti, reprehenderit aperiam beatae velit delectus ratione expedita, rem dicta nemo quasi reiciendis ipsa ad corrupti soluta. Unde.</p>
                        <span className={styles.time}>11:00</span>
                    </div>
                </div> */}
            </article>
            <form className={styles.form} onSubmit={onSubmitMessage}>
                <Input type="text" variant="secondary" ref={inputRef} value={message} onChange={onChangeMessage} placeholder="메시지를 입력해주세요." />
                <button type="submit">
                    <BsSend />
                </button>
            </form>
        </section>
    );
};

export default MessageRoom;
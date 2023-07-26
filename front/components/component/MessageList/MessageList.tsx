import React, { useCallback, useEffect, useState, use } from 'react';
import styles from './MessageList.module.scss';
import { BsFillPersonFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';

interface IMessageListParams {
    onClick: (user) => void,
    message: IChat,
    messageRoomUser: IMessageRoomUser
}

export interface IChat {
    chat_message: string
    id: string,
    usercode: string,
    username: string,
    created_at: string,
    profile_image_path: string
}

export interface IMessageRoomUser {
    userid: string,
    username: string,
    usercode: string,
    profileImagePath: string,
}

const MessageList = ({ onClick, message, messageRoomUser }: IMessageListParams) => {
    const { socket } = useSelector((state: RootState) => state.socket);
    const { user } = useSelector((state: RootState) => state.auth);
    const [alertMsg, setAlertMsg] = useState(null);
    const [alertCnt, setAlertCnt] = useState(0);

    const onClickMessageList = useCallback(() => {
        const user: IMessageRoomUser = {
            userid: message.id,
            username: message.username,
            usercode: message.usercode,
            profileImagePath: message.profile_image_path,
        }

        setAlertCnt(0);
        onClick(user);
    }, []);

    useEffect(() => {
        socket?.on('getMessage', (msg) => {
            if (msg.payload.sendUserId == message.id || msg.payload.receiveUserId == message.id) {
                setAlertMsg(msg.payload.chatMessage);
            }
            
            //FIXME: 알람 cnt 수정
            if (msg.payload.sendUserId !== user.id && msg.payload.sendUserId == message.id) {
                console.log(messageRoomUser);
                if (!messageRoomUser || messageRoomUser?.userid === message.id) return;
                setAlertCnt((prev) => prev + 1);
            }
        });
    }, [messageRoomUser]);

    return (
        <li className={styles.list} onClick={onClickMessageList}>
            <div className={styles.profile}>
                {message?.profile_image_path ? <img src={message.profile_image_path} alt="프로필" /> : <BsFillPersonFill />}
            </div>
            <div className={styles.content}>
                <div className={styles.user}>
                    <h3 className={styles.name}>{message.usercode}</h3>
                    <p className={styles.date}>{message.created_at}</p>
                </div>
                <p className={styles.text}>
                    {alertMsg ? alertMsg : message.chat_message}
                </p>
                
                {alertCnt > 0 && 
                    <div className={styles.alert}>
                        <span>{alertCnt}</span>
                    </div>
                }
            </div>
        </li>
    );
};

export default MessageList;
import React, { useCallback } from 'react';
import styles from './MessageList.module.scss';
import { BsFillPersonFill } from "react-icons/bs";

interface IMessageListParams {
    onClick: (user) => void,
    message: IChat
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

const MessageList = ({ onClick, message }: IMessageListParams) => {
    const onClickMessageList = useCallback(() => {
        const user: IMessageRoomUser = {
            userid: message.id,
            username: message.username,
            usercode: message.usercode,
            profileImagePath: message.profile_image_path,
        }
        onClick(user);
    }, []);
        
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
                <p className={styles.text}>{message.chat_message}</p>
                
                {/* TODO: alert 기능 추가 */}
                {/* <div className={styles.alert}>
                    <span>1</span>
                </div> */}
            </div>
        </li>
    );
};

export default MessageList;
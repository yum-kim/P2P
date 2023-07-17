import React, { useCallback } from 'react';
import styles from './MessageList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import { BsFillPersonFill } from "react-icons/bs";
import Profile from '../../common/Profile/Profile';
import { updateCurrentChatUserRequest } from '../../../store/slices/chat';

export interface IChat {
    chatMessage: string
    id: string,
    usercode: string
    username: string
    sendUserId?: string
    receiveUserId?: string
    deleteAt: string
}

const MessageList = ({ onClick, message }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const onClickMessageList = useCallback(() => {
        dispatch(updateCurrentChatUserRequest({
            userid: message.id,
            username: message.username,
            usercode: message.usercode,
            profileImagePath: message.profile_image_path,
        }))
        onClick();
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
                <div className={styles.alert}>
                    <span>1</span>
                </div>
            </div>
        </li>
    );
};

export default MessageList;
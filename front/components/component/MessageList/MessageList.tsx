import React from 'react';
import styles from './MessageList.module.scss';
import {  BsFillPersonFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import Profile from '../../common/Profile/Profile';

const MessageList = ({ onClickMessageList }) => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <li className={styles.list} onClick={onClickMessageList}>
            <Profile profileImagePath={user?.profileImagePath} />                  
            <div className={styles.content}>
                <div className={styles.user}>
                    <h3 className={styles.name}>yumi</h3>
                    <p className={styles.date}>11:15 PM</p>
                </div>
                <p className={styles.text}>다음에 만나자!!</p>
                <div className={styles.alert}>
                    <span>1</span>
                </div>
            </div>
        </li>

        
    );
};

export default MessageList;
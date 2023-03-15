import React from 'react';
import styles from './MessageList.module.scss';

const MessageList = ({ ...rest }) => {
    return (
        <li className={styles.list}>
            <div className={styles.profile}>
                <img src='/images/myProfile.jpeg' alt="profile" />
            </div>
            <div className={styles.content}>
                <div className={styles.user}>
                    <h3 className={styles.name}>yumi</h3>
                    <p className={styles.date}>11:15 PM</p>
                </div>
                <div className={styles.text}>
                    <p>다음에 만나자!</p>
                </div>
            </div>
        </li>

        
    );
};

export default MessageList;
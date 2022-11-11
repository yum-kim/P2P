import React from 'react';
import styles from './Card.module.scss';
import { symbol } from 'prop-types';

const Card = ({ children, ...rest }) => {
    const { name, profileURL, fileURL, date } = rest;
    const profile = profileURL;
    const file = fileURL;

    console.log(name, fileURL);

    return (
        <div className={styles.card}>
            <div className={styles.profile}>
                <div className={styles.img}>
                    <img src={profile} alt="profile" />
                </div>
                <div>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.date}>{date}</p>
                </div>
            </div>
            <div className={styles.content}>
                {file ? <img src={file} alt="" /> : ''}
                <p className={styles.content}>{children}</p>
            </div>
            <div className={styles.reaction}>
                <button className={styles.like}>
                    <i className="bi bi-hand-thumbs-up"></i>
                    좋아요
                </button>
                <button className={styles.comment}>
                    <i className="bi bi-chat-square-text"></i>
                    댓글
                </button>
            </div>
        </div>
    );
};

export default Card;
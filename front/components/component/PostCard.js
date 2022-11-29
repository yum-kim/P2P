import React, { useState, useCallback } from 'react';
import styles from './PostCard.module.scss';
import Comment from './Comment';

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const { postId, postDate, user, content, imagePath } = post;
    const onToggleLiked = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);
    const onToggleComments = useCallback(() => {
        setShowComments((prev) => !prev);
    }, []);

    return (
        <div className={styles.card}>
            <div className={styles.profile}>
                <div className={styles.img}>
                    <img src={user.profileImagePath} alt="profile" />
                </div>
                <div>
                    <p className={styles.name}>{user.nickname}</p>
                    <p className={styles.date}>{postDate}</p>
                </div>
            </div>
            <div className={styles.content}>
                {imagePath ? <img src={imagePath} alt="" /> : ''}
                <p className={styles.content}>{content}</p>
            </div>
            <div className={styles.reaction}>
                <button className={styles.like} onClick={onToggleLiked}>
                    <i className={`bi bi-hand-thumbs-up${liked ? '-fill' : ''}`}></i>
                    좋아요
                </button>
                <button className={styles.comment} onClick={onToggleComments}>
                    <i className="bi bi-chat-square-text"></i>
                    댓글
                </button>
            </div>

            {showComments && (<Comment post={post} />)}

        </div>
    );
};

export default PostCard;
import React, { useState, useCallback } from 'react';
import styles from './PostCard.module.scss';
import Comment from './Comment';
import { BsHandThumbsUpFill, BsHandThumbsUp, BsChatLeftTextFill, BsChatLeftText } from "react-icons/bs";

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
                {imagePath && <img src={imagePath} alt="attached image" />}
                <p className={styles.content}>{content}</p>
            </div>
            <div className={styles.reaction}>
                <button className={liked && styles.liked} onClick={onToggleLiked}>
                    {liked ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
                    좋아요
                </button>
                <button onClick={onToggleComments}>
                    {showComments ? <BsChatLeftTextFill /> : <BsChatLeftText />}
                    댓글
                </button>
            </div>
            {showComments && (<Comment post={post} />)}
        </div>
    );
};

export default PostCard;
import React, { useState, useCallback } from 'react';
import styles from './PostCard.module.scss';
import Comment from './Comment';
import { BsHandThumbsUpFill, BsHandThumbsUp, BsChatLeftTextFill, BsChatLeftText, BsLockFill, BsUnlock } from "react-icons/bs";
import Button from '../element/Button/Button';
import { useDispatch } from 'react-redux';

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const { postId, postDate, user, content, imagePath } = post;
    const dispatch = useDispatch();
    
    const onToggleLiked = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);
    const onToggleComments = useCallback(() => {
        setShowComments((prev) => !prev);
    }, []);

    //TODO: post status 변경
    const onChangePostStatus = () => {
        
    }

    return (
        <div className={styles.card}>
            <div className={styles.profile}>
                <div className={styles.img}>
                    <img src={user.profileImagePath} alt="profile" />
                </div>
                <div>
                    <p className={styles.name}>{user.nickname}</p>
                    <div>
                        <span className={styles.date}>{postDate}</span>
                        <button className={styles.status} onClick={onChangePostStatus}>
                            <BsLockFill/>
                            {/* <BsUnlock /> */}
                        </button>
                    </div>
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
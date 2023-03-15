import React, { useState, useCallback } from 'react';
import styles from './PostCard.module.scss';
import { BsHandThumbsUpFill, BsHandThumbsUp, BsChatLeftTextFill, BsChatLeftText, BsLockFill } from "react-icons/bs";
import { MdPublic } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import Comment from '../Comment/Comment';

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
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
                    {post.user?.profileImagePath ? <img src={post.user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />}
                </div>
                <div>
                    <p className={styles.name}>{post.user?.username}</p>
                    <div>
                        <span className={styles.date}>{post.createAt}</span>
                        <button className={styles.status} onClick={onChangePostStatus}>
                            {post.status === 'PUBLIC' ? <MdPublic title="전체공개" /> : <BsLockFill title="나만보기" />}
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                {post.imagePath && <img src={post.imagePath} alt="attached image" />}
                <p className={styles.content}>{post.description}</p>
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
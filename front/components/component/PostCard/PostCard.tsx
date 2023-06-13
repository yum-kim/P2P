import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import styles from './PostCard.module.scss';
import { BsChatLeftTextFill, BsChatLeftText, BsLockFill } from "react-icons/bs";
import { MdPublic, MdOutlineMoreHoriz } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import Comment from '../Comment/Comment';
import { changePostStatusRequestAction, deletePostRequestAction, changePostHitRequestAction } from '../../../store/actions/post';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

interface IPostProps {
    post: IPost
}

export interface IPost {
    id: number,
    user: IUser,
    description: string,
    imagePath: string,
    hit: number,
    comment: IComment[],
    status: "PUBLIC" | "PRIVATE",
    createAt: string,
    deleteAt: string,
    updatedAt: string,
}

export interface IUser {
    id: number,
    usercode: string,
    username: string,
    password: string
    profileImagePath: string
}

export interface IComment {
    id: number,
    boardId: number,
    comment: string,
    createAt: string,
    updatedAt: string,
    user: IUser 
}

const PostCard = ({ post }: IPostProps) => {
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [status, setStatus] = useState(post.status);
    const dispatch = useDispatch();

    const onToggleComments = useCallback(() => {
        setShowComments((prev) => !prev);
    }, []);

    //TODO: post status 변경
    const onChangePostStatus = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const changeStatus = status == "PUBLIC" ? "PRIVATE" : "PUBLIC";
        setStatus(changeStatus);
        dispatch(changePostStatusRequestAction({ id: post.id, body: { status: changeStatus }}));
    }, [status]);

    //TODO: post hit API 추가 되면 맞추기
    const onClickLikedButton = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        setLiked((prev) => !prev);
        // dispatch(changePostHitRequestAction({ id: post.id, body: { hit: true }}));
    }, [liked]);

    useEffect(() => {
        if (post.comment.length > 0) {
            setShowComments(true);   
        }
    }, []);
    
    return (
        <article className={styles.card}>
            <div className={styles.top}>
                <div className={styles.profile}>
                    <div className={styles.img}>
                        {post.user.profileImagePath ? <img src={post.user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />}
                    </div>
                    <div className={styles.postInfo}>
                        <p className={styles.name}>{post.user.username}</p>
                        <div>
                            <span className={styles.date}>{post.createAt}</span>
                            <button className={styles.status} onClick={onChangePostStatus}>
                                {post.status === 'PUBLIC' ? <MdPublic title="전체공개" /> : <BsLockFill title="나만보기" />}
                            </button>
                        </div>
                    </div>
                </div>
                {/* <div className={styles.otherBtn}>
                </div> */}
            </div>
            <div className={styles.content}>
                {post.imagePath && <img src={post.imagePath} alt="attached image" />}
                <p className={styles.content}>{post.description}</p>
            </div>
            <div className={styles.reaction}>
                <button className={`${liked && styles.liked} ${styles.likedBtn}`} onClick={onClickLikedButton}>
                    {liked ? <FcLike /> : <FcLikePlaceholder />} {post.hit}
                </button>
                <button className={styles.commentBtn} onClick={onToggleComments}>
                    {showComments ? <BsChatLeftTextFill /> : <BsChatLeftText />}
                    댓글 {post.comment.length}
                </button>
            </div>
            {showComments && (<Comment post={post} />)}
        </article>
    );
};

export default PostCard;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './PostCard.module.scss';
import { BsChatLeftTextFill, BsChatLeftText, BsLockFill } from "react-icons/bs";
import { MdPublic, MdOutlineMoreHoriz } from "react-icons/md";
import { BsFillPersonFill, BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import Comment from '../Comment/Comment';
import { changePostStatusRequestAction, deletePostRequestAction, updatePostHeartRequestAction } from '../../../store/actions/post';
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
    heart: boolean,
    heartCount: number
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
    const [heart, setHeart] = useState(post.heart);
    const [status, setStatus] = useState(post.status);
    const [isShowOtherMenu, setIsShowOtherMenu] = useState(false);
    const dispatch = useDispatch();
    const otherMenuRef = useRef(null);

    const onToggleComments = useCallback(() => {
        setShowComments((prev) => !prev);
    }, []);

    const onChangePostStatus = useCallback(() => {
        const changeStatus = status == "PUBLIC" ? "PRIVATE" : "PUBLIC";
        setStatus(changeStatus);
        dispatch(changePostStatusRequestAction({ id: post.id, body: { status: changeStatus } }));
        setIsShowOtherMenu(false);
    }, [status]);

    const onUpdatePost = useCallback((id) => {
        //TODO: 게시물 수정 confirm 추가
        // if () {
        // }

        setIsShowOtherMenu(false);
    }, [])
    
    const onDeletePost = useCallback((id) => {
        //TODO: 게시물 삭제 confirm 추가
        // if () {
        // }

        dispatch(deletePostRequestAction(id));
        setIsShowOtherMenu(false);
    }, [])

    const onClickHeartButton = useCallback(() => {
        setHeart((prev) => !prev);
        dispatch(updatePostHeartRequestAction({ boardId: post.id, heart: !heart }));
    }, [heart]);

    const onShowOtherMenu = useCallback(() => {
        if (isShowOtherMenu) {
            setIsShowOtherMenu(false);
        } else {
            setIsShowOtherMenu(true);
        }
    }, [isShowOtherMenu]);

    const handleOutsideClick = (e) => {
        if (otherMenuRef.current && !otherMenuRef.current.contains(e.target)) {
            setIsShowOtherMenu(false);    
        }
    }

    useEffect(() => {
        if (post.comment.length > 0) {
            setShowComments(true);   
        }
    }, []);

    useEffect(() => {
        if (isShowOtherMenu) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [isShowOtherMenu]);
     
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
                <div className={styles.otherBtn}>
                    <button className={styles.dotsBtn} onClick={onShowOtherMenu}>
                        <BsThreeDots />
                    </button>
                    {isShowOtherMenu && 
                        <ul ref={otherMenuRef}>
                            <li>
                                <button onClick={() => onUpdatePost(post.id)}>게시물 수정</button>
                            </li>
                            <li>
                                <button onClick={onChangePostStatus}>공개 대상 수정</button>
                            </li>
                            <li>
                                <button onClick={() => onDeletePost(post.id)}>게시물 삭제</button>
                            </li>
                        </ul>
                    }
                </div>
            </div>
            <div className={styles.content}>
                {post.imagePath && <img src={post.imagePath} alt="attached image" />}
                <p className={styles.content}>{post.description}</p>
            </div>
            <div className={styles.reaction}>
                <button className={`${heart && styles.liked} ${styles.likedBtn}`} onClick={onClickHeartButton}>
                    {heart ? <FcLike /> : <FcLikePlaceholder />} {post.heartCount}
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
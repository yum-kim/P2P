import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './PostCard.module.scss';
import { BsChatLeftTextFill, BsChatLeftText, BsLockFill } from "react-icons/bs";
import { MdPublic, MdOutlineMoreHoriz } from "react-icons/md";
import { BsFillPersonFill, BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import Comment from '../Comment/Comment';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Input from '../../element/Input/Input';
import Button from '../../element/Button/Button';
import { changePostStatusRequest, updatePostRequest, deletePostRequest, updatePostHeartRequest } from '../../../store/slices/post';
import { RootState } from '../../../store/configureStore';

export interface IPost {
    id: number,
    user: IUser,
    description: string,
    boardImage: IPostImage[],
    hit: number,
    comment: IPostComment[],
    status: "PUBLIC" | "PRIVATE",
    createAt: string,
    deleteAt: string,
    updatedAt: string,
    heart: boolean,
    heartCount: number
}

export interface IUser {
    id: number,
    usercode?: string,
    username: string,
    password?: string
    profileImagePath: string,
    accessToken?:string
}

export interface IPostImage {
    id: number,
    imagePath: string,
    createAt: string,
    deleteAt: string | null,
    boardId: number,
    imageName: string
}
export interface IPostComment {
    id: number,
    boardId: number,
    comment: string,
    createAt: string,
    updatedAt: string,
    user: IUser 
}

const PostCard = ({ post }: { post: IPost }) => {
    const [showComments, setShowComments] = useState(false);
    const [heart, setHeart] = useState(post.heart);
    const [status, setStatus] = useState(post.status);
    const [isShowOtherMenu, setIsShowOtherMenu] = useState(false);
    const dispatch = useDispatch();
    const otherMenuRef = useRef(null);
    const [description, setDescription] = useState(post.description);
    const [showPostInput, setShowPostInput] = useState(false);
    const updateDescRef = useRef<HTMLTextAreaElement>(null);
    
    const onToggleComments = useCallback(() => {
        setShowComments((prev) => !prev);
    }, []);

    const onChangePostStatus = useCallback(() => {
        const changeStatus = status == "PUBLIC" ? "PRIVATE" : "PUBLIC";
        setStatus(changeStatus);
        dispatch(changePostStatusRequest({ id: post.id, body: { status: changeStatus } }));
        setIsShowOtherMenu(false);
    }, [status]);

    const onShowPostInput = useCallback(() => {
        setShowPostInput(true);
        setIsShowOtherMenu(false);

        //FIXME: focus 안됨
        updateDescRef.current && updateDescRef.current.focus();
    }, [showPostInput]);
    
    const updatePost = useCallback(() => {
        //TODO: 게시물 수정 confirm 추가
        // if () {
        // }
        dispatch(updatePostRequest({ id: post.id, body: { description: description } }))
        setShowPostInput(false);
    }, [description]);

    const onDeletePost = useCallback(() => {
        //TODO: 게시물 삭제 confirm 추가
        // if () {
        // }

        dispatch(deletePostRequest(post.id));
        setIsShowOtherMenu(false);
    }, [])

    const onClickHeartButton = useCallback(() => {
        setHeart((prev) => !prev);
        dispatch(updatePostHeartRequest({ boardId: post.id, heart: !heart }));
    }, [heart]);

    const onShowOtherMenu = useCallback(() => {
        if (isShowOtherMenu) {
            setIsShowOtherMenu(false);
        } else {
            setIsShowOtherMenu(true);
        }
    }, [isShowOtherMenu]);

    const handleOutsideClick = useCallback((e) => {
        if (otherMenuRef.current && !otherMenuRef.current.contains(e.target)) {
            setIsShowOtherMenu(false);
        }
    }, []);

    const onChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }, []);

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
                        {post.user.profileImagePath ? <img src={`${post.user.profileImagePath}`} alt="프로필" /> : <BsFillPersonFill />}
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
                                <button onClick={onShowPostInput}>게시물 수정</button>
                            </li>
                            <li>
                                <button onClick={onChangePostStatus}>공개 대상 수정</button>
                            </li>
                            <li>
                                <button onClick={onDeletePost}>게시물 삭제</button>
                            </li>
                        </ul>
                    }
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.imgBox}>
                    {post.boardImage?.map((img) => {
                        return (
                            <img
                                src={img.imagePath}
                                alt={img.imageName}
                                className={`${styles['img' + post.boardImage.length]}`}
                            />
                        )
                    })}
                </div>
                {showPostInput ? 
                    <div className={styles.updateBox}>
                        <Input type="textarea" value={description} height='100' onChange={onChangeText} ref={updateDescRef} />
                        <Button varient="primary-blue" onClick={updatePost}>수정</Button>
                    </div>
                    : <p className={styles.content}>{post.description}</p>
                }
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
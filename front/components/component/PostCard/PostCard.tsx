import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './PostCard.module.scss';
import { BsChatLeftTextFill, BsChatLeftText, BsLockFill } from "react-icons/bs";
import { MdPublic } from "react-icons/md";
import { BsFillPersonFill, BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import Comment from '../Comment/Comment';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Input from '../../element/Input/Input';
import Button from '../../element/Button/Button';
import { changePostStatusRequest, updatePostRequest, deletePostRequest, updatePostHeartRequest } from '../../../store/slices/post';
import PostImage from '../PostImage/PostImage';
import { RootState } from '../../../store/configureStore';
import useModal from '../../../hooks/useModal';
import useInput from '../../../hooks/useInput';
import { resetSpecificAuth } from '../../../store/slices/auth';

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
    username: string,
    usercode?: string,
    password?: string
    profileImagePath: string,
    accessToken?: string,
    refreshToken?: string
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
    const [description, onChangeDescrption] = useInput(post.description);
    const [showPostInput, setShowPostInput] = useState(false);
    const updateDescRef = useRef<HTMLTextAreaElement>(null);
    const { user } = useSelector((state: RootState) => state.auth);
    const { Modal, onShowModal } = useModal(false);
    
    const onToggleComments = useCallback(() => {
        setShowComments((prev) => !prev);
    }, []);

    const onChangePostStatus = useCallback(() => {
        const changeStatus = status == "PUBLIC" ? "PRIVATE" : "PUBLIC";
        
        onShowModal(`게시물 상태를 ${changeStatus == "PUBLIC" ? "공개" : "비공개"}로 변경하시겠습니까?`, {
            confirm: () => {
                setStatus(changeStatus);
                dispatch(changePostStatusRequest({ id: post.id, body: { status: changeStatus } }));
                setIsShowOtherMenu(false);
            }
        });
    }, [status]);
    
    const onShowPostInput = useCallback(() => {
        setShowPostInput(true);
        setIsShowOtherMenu(false);
    }, [showPostInput]);

    useEffect(() => {
        if (showPostInput && updateDescRef.current) {
            updateDescRef.current.focus();
            const length = updateDescRef.current.value.length;
            updateDescRef.current.setSelectionRange(length, length); //커서 마지막 글자로 이동
        }
    }, [showPostInput]);
    
    const updatePost = useCallback(() => {
        onShowModal("게시물을 수정하시겠습니까?", {
            confirm: () => {
                dispatch(updatePostRequest({ id: post.id, body: { description: description } }))
                setShowPostInput(false);
            }
        });
    }, [description]);

    const onDeletePost = useCallback(() => {
        onShowModal("게시물을 삭제하시겠습니까?", {
            confirm: () => {
                dispatch(deletePostRequest(post.id));
                setIsShowOtherMenu(false);
            }
        });
    }, [])

    const onClickHeartButton = useCallback(() => {
        setHeart((prev) => !prev);
        dispatch(updatePostHeartRequest({ boardId: post.id, heart: !heart }));
    }, [heart]);

    const onShowOtherMenu = useCallback((e) => {
        if (isShowOtherMenu) {
            setIsShowOtherMenu(false);
        } else {
            setIsShowOtherMenu(true);
        }

        e.stopPropagation();
    }, [isShowOtherMenu]);

    const handleOutsideClick = useCallback((e) => {
        if (otherMenuRef.current && !otherMenuRef.current.contains(e.target)) {
            setIsShowOtherMenu(false);
        }
    }, []);

    useEffect(() => {
        post.comment.length > 0 && setShowComments(true);
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
            <Modal />
            <div className={styles.top}>
                <div className={styles.profile}>
                    <div className={styles.img}>
                        {post.user.profileImagePath ? <img src={`${post.user.profileImagePath}`} alt="프로필" /> : <BsFillPersonFill />}
                    </div>
                    <div className={styles.postInfo}>
                        <p className={styles.name}>{post.user.usercode} <span className={styles.username}>({post.user.username})</span></p>
                        <div className={styles.dateBox}>
                            <span className={styles.date}>{post.createAt}</span>
                            <span className={styles.status}>
                                {post.status === 'PUBLIC' ? <MdPublic title="전체공개" /> : <BsLockFill title="나만보기" />}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.otherBtn}>
                    {user && user.id === post.user.id && (
                        <button className={styles.dotsBtn} onClick={onShowOtherMenu}>
                            <BsThreeDots />
                        </button>
                    )}
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
                {post.boardImage?.length > 0 &&
                <div className={styles.imgBox}>
                     <PostImage boardImage={post.boardImage} />
                </div>
                }
                {showPostInput ? 
                    <div className={styles.updateBox}>
                        <Input type="textarea" value={description} height='100' onChange={onChangeDescrption} ref={updateDescRef} />
                        <div className={styles.updateBtn}>
                            <Button variant="primary-blue" onClick={updatePost}>수정</Button>
                            <Button variant="primary-blue" onClick={() => setShowPostInput(false)}>취소</Button>
                        </div>
                    </div>
                    : <p className={styles.description}>{post.description}</p>
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
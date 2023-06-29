import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './Comment.module.scss';
import Input from '../../element/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { BsSend, BsFillPersonFill, BsPencil, BsTrash3 } from "react-icons/bs";
import { IPost, IPostComment } from '../PostCard/PostCard';
import { RootState } from '../../../store/configureStore';
import { addCommentRequest, updateCommentRequest, deleteCommentRequest } from '../../../store/slices/post';
import useModal from '../../../hooks/useModal';
import useInput from '../../../hooks/useInput';

const Comment = ({ post } : { post: IPost }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const updateInputRef = useRef<HTMLInputElement>(null);
    const [comment, onChangeForm, setComment] = useInput('');
    const [updateComment, setUpdateComment] = useState({ id: null, comment: null });
    const [showCommentInput, setShowCommentInput] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const { addCommentLoading } = useSelector((state: RootState) => state.post);
    const dispatch = useDispatch();
    const { Modal, onShowModal } = useModal(false);

    const onChangeUpdateForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateComment({ id: updateComment.id, comment: e.currentTarget.value });
    }, [updateComment]);
    
    const onSubmitComment = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!comment.replace(/\s/g, "") || addCommentLoading) return;
        dispatch(addCommentRequest({ boardId: post.id, comment, user: user }));
        setComment('');
    }, [comment]);
    
    const onActiveUpdateCommentInput = useCallback((id: number, comment: string) => {
        //TODO: 이미 활성화된 수정 input이 있을 때 block 처리 추가
        // if (showCommentInput) {
        //     onShowModal();
        //     setModalContent("이미 수정 중인 댓글이 있습니다.");
        //     return;
        // }

        setShowCommentInput(true);
        setUpdateComment({ id: id, comment: comment });
    }, []);
    
    useEffect(() => {
        if (showCommentInput && updateInputRef.current) {
            updateInputRef.current && updateInputRef.current.focus();
        }
    }, [showCommentInput]);

    const onSubmitUpdateComment = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!updateComment.id) return;

        dispatch(updateCommentRequest({
            data: { id: updateComment.id, body: { comment: updateComment.comment } },
            boardId: post.id
        }));
        setShowCommentInput(false);
        setUpdateComment({ id: null, comment: null});
    }, [updateComment]);

    const onClickDeleteComment = useCallback((id: number) => {
        if (!id) return;

        onShowModal("댓글을 삭제하시겠습니까?", {
            confirm: () => {
                dispatch(deleteCommentRequest({ id: id, boardId: post.id }));
            }
        })
    }, []);

    const onCancelUpdateComment = useCallback(() => {
        setShowCommentInput(false);
        setUpdateComment({ id: null, comment: null});
    }, []);

    return (
        <div className={styles.comments}>
            <Modal />
            <p className={styles.length}>{post.comment.length}개의 댓글이 있습니다.</p>
            <form className={styles.form} onSubmit={onSubmitComment}>
                <Input type="text" placeholder="댓글을 입력하세요." variant="background" ref={inputRef} value={comment} onChange={onChangeForm} />
                <button type="submit">
                    <BsSend />
                </button>
            </form>
            <ul>
                {post.comment.map((comment: IPostComment) => (
                    <li key={comment.id} className={styles.list}>
                        <div className={styles.img}>
                            {comment.user.profileImagePath ? <img src={comment.user.profileImagePath} alt="profile" /> : <BsFillPersonFill />}
                        </div>
                        <div className={styles.rhtBox}>
                            <p className={styles.name}>{comment.user.usercode} ({comment.user.username})</p>
                            <div className={styles.content}>
                                {!showCommentInput || updateComment.id !== comment.id ? (
                                    <>
                                        <span className={styles.description}>
                                            {comment.comment}
                                            <span className={styles.date}>{comment.updatedAt} {comment.createAt !== comment.updatedAt && (<span>(수정됨)</span>)}</span>
                                        </span>

                                        {user && comment.user.id === user.id && (
                                            <span className={styles.myCommentBtns}>
                                                <button onClick={() => onActiveUpdateCommentInput(comment.id, comment.comment)}>
                                                    <BsPencil />
                                                </button>
                                                <button onClick={() => onClickDeleteComment(comment.id)}>
                                                    <BsTrash3 />
                                                </button>
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <form className={styles.form} onSubmit={onSubmitUpdateComment} style={{ padding: `0.3rem 0` }}>
                                            <Input type="text" variant="primary" ref={updateInputRef} value={updateComment.comment} onChange={onChangeUpdateForm} />
                                            <button type="submit">
                                                <BsSend />
                                            </button>
                                        </form>
                                        <button onClick={onCancelUpdateComment} className={styles.cancelBtn}>취소</button>
                                    </>
                                    )
                                }

                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
            
    );
};

export default Comment;
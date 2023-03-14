import React, { useRef, useState } from 'react';
import styles from './Comment.module.scss';
import Input from '../element/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentRequestAction } from '../../store/actions/post';
import { BsSend } from "react-icons/bs";

const Comment = ({ post }) => {
    const inputRef = useRef(null);
    const [comment, setComment] = useState('');
    const onChangeForm = (e) => {
        setComment(e.currentTarget.value);
    };

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onClickComment = () => {
        if (!comment.replace(/\s/g, "")) return;

        const commentObj = {
            postId: post.postId,
            user: user?.nickname,
            date: '2022',
            content: comment
        }
        dispatch(addCommentRequestAction(commentObj));
        setComment('');
    };

    return (
        <div className={styles.comments}>
            <p className={styles.length}>{post.Comments.length}개의 댓글이 있습니다.</p>
            <div className={styles.form}>
                <Input placeholder="댓글을 입력하세요." varient="primary" ref={inputRef} value={comment} onChange={onChangeForm} />
                <button onClick={onClickComment}>
                    <BsSend />
                </button>
            </div>
            <ul>
                {post.Comments.map((comment) => (
                    <li className={styles.list}>
                        <div className={styles.img}>
                            <img src={post.user.profileImagePath} alt="profile" />
                        </div>
                        <div className={styles.content}>
                            <p className={styles.name}>{comment.user}</p>
                            <p className={styles.text}>
                                {comment.content}
                                <span className={styles.date}>{comment.date}</span>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
            
    );
};

export default Comment;
import React from 'react';
import styles from './Comment.module.scss';


const Comment = ({ post }) => {
    return (
        
        <div className={styles.comments}>
            <p className={styles.length}>{post.Comments.length}개의 댓글이 있습니다.</p>
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
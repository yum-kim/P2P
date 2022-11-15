import React, { useRef, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './PostForm.module.scss';
import Button from '../common/Button';
import Input from '../common/Input';
import { addPost } from '../../reducers/post';

const PostForm = () => {
    const [text, setText] = useState('');
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const dispatch = useDispatch();
    const dummyData = {
        postId: 2,
        postDate: '2022.11.15 14:00:00',
        user: {
            id: 2,
            nickname: 'jemin',
            profileImagePath: '/images/profile.png'
        },
        content: text
    }
    const onClickUploadPost = () => {
        dispatch(addPost(dummyData));
        setText('');
    };

    return (
        <div className={styles.postForm}>
            <Input type='textarea' value={text} placeholder='오늘은 어떤 일이 있었나요?' height='100' onChange={onChangeText} />
            <div className={styles.btnWrapper}>
                <input type="file" ref={imageInput} multiple hidden />
                <Button varient='outlined' onClick={onClickImageUpload}>
                    <i class="bi bi-card-image"></i>이미지 선택
                </Button>
                <Button onClick={onClickUploadPost}>
                    <i class="bi bi-upload"></i>업로드
                </Button>
            </div>
        </div>
    );
};

export default PostForm;
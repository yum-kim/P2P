import React, { useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PostForm.module.scss';
import Button from '../element/Button/Button';
import Input from '../element/Input/Input';
import { addPostRequestAction } from '../../store/actions/post';

import { BsFillPersonFill, BsFileImage, BsCloudUpload } from "react-icons/bs";


const PostForm = () => {
    const user = useSelector((state) => state.user);
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
        content: text,
        Comments: []
    }
    const onClickUploadPost = () => {
        dispatch(addPostRequestAction(dummyData));
        setText('');
    };

    return (
        <div className={styles.postForm}>
            <div className={styles.img}>
                {user.profileImagePath ? <img src={user.profileImagePath} alt="" /> : <BsFillPersonFill />}
            </div>
            <div className={styles.content}>
                <Input type='textarea' value={text} placeholder='오늘은 어떤 일이 있었나요?' height='100' onChange={onChangeText} />
                <div className={styles.btnWrapper}>
                    <input type="file" ref={imageInput} multiple hidden />
                    <Button varient='outlined' onClick={onClickImageUpload}>
                        <BsFileImage />이미지 선택
                    </Button>
                    <Button onClick={onClickUploadPost}>
                        <BsCloudUpload />업로드
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
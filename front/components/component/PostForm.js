import React, { useRef, useCallback } from 'react';
import styles from './PostForm.module.scss';
import Button from '../common/Button';
import Input from '../common/Input';

const PostForm = () => {
    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    return (
        <div className={styles.postForm}>
            <Input type='textarea' placeholder='오늘은 어떤 일이 있었나요?' height='100' />
            <div className={styles.btnWrapper}>
                <input type="file" ref={imageInput} multiple hidden />
                <Button varient='outlined' onClick={onClickImageUpload}>
                    <i class="bi bi-card-image"></i>이미지 선택
                </Button>
                <Button>
                    <i class="bi bi-upload"></i>업로드
                </Button>
            </div>
        </div>
    );
};

export default PostForm;
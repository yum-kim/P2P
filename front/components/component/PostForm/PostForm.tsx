import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PostForm.module.scss';
import Button from '../../element/Button/Button';
import Input from '../../element/Input/Input';
import { BsFillPersonFill, BsFileImage, BsCloudUpload } from "react-icons/bs";
import { useRouter } from 'next/dist/client/router';
import { RootState } from '../../../store/configureStore';
import { addPostRequest } from '../../../store/slices/post';

const PostForm = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [text, setText] = useState('');
    const [files, setFiles] = useState<File[] | null>(null);
    const onChangeText = useCallback((e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }, []);

    const imageInput = useRef<HTMLInputElement>(null);
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const dispatch = useDispatch();
    const router = useRouter();

    const onClickUploadPost = () => {
        if (!text && !files) return;
        
        let formData = new FormData();
        formData.append('description', text);
        
        if (files) {
            for (let file of files) {
                formData.append('files', file);
            }
            // let entries = formData.entries();
            // for (const pair of entries) {
            //     console.log(pair[0]);
            //     console.log(pair[1]);
            // }
        }

        dispatch(addPostRequest({ formData, user }));
        setText('');
        setFiles(null);
    };

    const onChangeImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileList = Array.from(files);
            setFiles(fileList);
        }
    }    

    return (
        <div className={styles.postForm}>
            <div className={styles.img}>
                {user && user.profileImagePath ? <img src={user.profileImagePath} alt="" /> : <BsFillPersonFill />}
            </div>
            <div className={styles.content}>
                <Input type='textarea' value={text} placeholder='오늘은 어떤 일이 있었나요?' height='100' onChange={onChangeText} />
                <div className={styles.btnWrapper}>
                    <input type="file" ref={imageInput} onChange={onChangeImageFile} multiple hidden />
                    <Button variant='outlined' onClick={onClickImageUpload}>
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
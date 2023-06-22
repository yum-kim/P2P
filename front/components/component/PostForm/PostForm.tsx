import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PostForm.module.scss';
import Button from '../../element/Button/Button';
import Input from '../../element/Input/Input';
import { BsFillPersonFill, BsFileImage, BsCloudUpload, BsXCircleFill } from "react-icons/bs";
import { RootState } from '../../../store/configureStore';
import { addPostRequest } from '../../../store/slices/post';

const PostForm = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [text, setText] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const imageInput = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const onChangeText = useCallback((e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onClickUploadPost = useCallback(() => {
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
        setFiles([]);
    }, [text, files]);

    const onAddImageFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const newFiles = Array.from(e.target.files);

        //중복된 이미지가 또 등록됐을 경우 filter
        const filteredFiles = newFiles.filter((file) =>
            !files.some((prevFile) => prevFile.name === file.name)
        );
        
        setFiles((prevFiles) => [ ...prevFiles, ...filteredFiles ]);

        e.target.value = "";
    }, [files]);

    const onDeleteUploadedImage = useCallback((file: File) => {
        setFiles((prevFiles) => {
            const deletedFiles = prevFiles.filter((v) => v.name !== file.name);
            const fileList = Array.from(deletedFiles);
            return fileList;
        });
    }, []);

    return (
        <div className={styles.postForm}>
            <div className={styles.profile}>
                {user && user.profileImagePath ? <img src={user.profileImagePath} alt="" /> : <BsFillPersonFill />}
            </div>
            <div className={styles.content}>
                <Input type='textarea' value={text} placeholder='오늘은 어떤 일이 있었나요?' height='100' onChange={onChangeText} />

                <div className={styles.others}>
                    <div className={styles.uploadedImg}>
                        {files.length > 4 && <p className={styles.alert}>이미지는 4개 이하로 업로드해주세요.</p>}
                        <ul>
                            {files?.map((file) => (
                                <li>
                                    {file.name}
                                    <button onClick={() => onDeleteUploadedImage(file)}><BsXCircleFill /></button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.btnWrapper}>
                        <input type="file" ref={imageInput} onChange={onAddImageFile} multiple hidden />
                        <Button variant='outlined' onClick={onClickImageUpload}>
                            <BsFileImage />이미지 선택
                        </Button>
                        <Button onClick={onClickUploadPost} disabled={files.length > 4}>
                            <BsCloudUpload />업로드
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
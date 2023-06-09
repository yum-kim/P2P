import React, { useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PostForm.module.scss';
import Button from '../../element/Button/Button';
import Input from '../../element/Input/Input';
import { BsFillPersonFill, BsFileImage, BsCloudUpload } from "react-icons/bs";
import { addPostRequestAction } from '../../../store/actions/post';
import { RootState } from '../../../store/reducers';

const PostForm = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [text, setText] = useState('');
    const onChangeText = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }, []);

    const imageInput = useRef<HTMLInputElement>(null);
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const dispatch = useDispatch();

    //TODO: 게시판생성 API body값 수정되면 여기도 맞추기
    const dummyData = {
        title: '타이틀요',
        description: text
        // userid: user.userid,
        // username: user.username,
        // description: text,
        // imagePath: '',
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
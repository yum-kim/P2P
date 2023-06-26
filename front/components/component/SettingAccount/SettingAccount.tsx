import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './SettingAccount.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import { BsFillPersonFill, BsFileEarmarkPersonFill, BsFillArrowLeftCircleFill, BsFillTrashFill } from "react-icons/bs";
import Input from '../../element/Input/Input';
import { MdPassword } from 'react-icons/md';
import Button from '../../element/Button/Button';

const SettingAccount = ({ onClose }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const profileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState(user?.username || null);
    const [pw, setPw] = useState(user?.password || null);

    const [isActiveNameInput, setIsActiveNameInput] = useState(false);
    const [isActivePwInput, setIsActivePwInput] = useState(false);

    const onClickImageUpload = useCallback(() => {
        profileInputRef.current.click();
    }, [profileInputRef.current]);

    const uploadImage = useCallback(() => {
        const formData = new FormData();
        formData.append('files', file);

        //TODO: image update dispatch 추가

        setFile(null);
    }, [file]);

    const onChangeProfileImg = useCallback((e) => {
        if (!e.target.files) return;
        setFile(e.target.files[0]);
        e.target.value = "";
        uploadImage();
    }, [file]);

    const onChangeName = useCallback((e) => {
        setName(e.currentTarget.value);
    }, [name]);

    const onChangePw = useCallback((e) => {
        setPw(e.currentTarget.value);
    }, [pw]);

    const onActiveNameInput = useCallback(() => {
        setIsActiveNameInput((prev) => !prev);

        //TODO: 저장 추가
        if (isActiveNameInput) {

        }
    }, []);

    const onActivePwInput = useCallback(() => {
        setIsActivePwInput((prev) => !prev);

        //TODO: 저장 추가
        if (isActivePwInput) {

        }
    }, []);

    const onDeleteProfile = useCallback(() => {
        //TODO: image null로 update dispatch 추가
        setFile(null);
    }, []);

    useEffect(() => {
        console.log(file);
    }, [file]);
    
    return (
        <section className={styles.setting}>
            <div className={styles.settingWrapper}>
                <article className={styles.profile}>
                    <div className={styles.profileTop}>
                        <div className={styles.profileImg}>
                            {user && user.profileImagePath ? <img src={user.profileImagePath} alt="" /> : <BsFillPersonFill />}
                        </div>
                        <input type="file" ref={profileInputRef} onChange={onChangeProfileImg} hidden />
                        <button className={styles.profileBtn} onClick={onClickImageUpload}>
                            <BsFileEarmarkPersonFill />
                        </button>
                    </div>
                    <div className={styles.deleteProfileBtn}>
                        <Button variant="primary-blue" onClick={onDeleteProfile}>
                            <BsFillTrashFill />이미지 삭제
                        </Button>
                    </div>
                </article>
                <article className={styles.content}>
                    <div className={styles.list}>
                        <label htmlFor="name">Nickname</label>

                        {isActiveNameInput ? (
                            <Input type="text" id="name" onChange={onChangeName} value={name} />
                        ) : (
                            <Input type="text" id="name" value={name} disabled/>
                        )}   
                        <button onClick={onActiveNameInput}>{isActiveNameInput ? '저장' : '수정'}</button>
                    </div>
                    <div className={styles.list}>
                        <label htmlFor="pw">password</label>

                        {isActivePwInput ? (
                            <Input type="password" id="pw" onChange={onChangePw} value={pw} />
                        ) : (
                            <Input type="password" id="pw" value={pw} disabled/>
                        )}
                        <button onClick={onActivePwInput}>{isActivePwInput ? '저장' : '수정'}</button>
                    </div>
                </article>
                <button className={styles.backBtn} onClick={onClose}><BsFillArrowLeftCircleFill />돌아가기</button>
            </div>
        </section>
    );
};

export default SettingAccount;
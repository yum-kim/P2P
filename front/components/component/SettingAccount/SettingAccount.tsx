import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './SettingAccount.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import { BsFillPersonFill, BsFileEarmarkPersonFill, BsFillArrowLeftCircleFill, BsFillTrashFill } from "react-icons/bs";
import Input from '../../element/Input/Input';
import Button from '../../element/Button/Button';
import { updateUserRequest } from '../../../store/slices/auth';
import useModal from '../../../hooks/useModal';

const SettingAccount = ({ onClose }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [file, setFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState(user?.usercode || null);
  const [password, setPassword] = useState(null);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isActiveNameInput, setIsActiveNameInput] = useState(false);
  const [isActivePwInput, setIsActivePwInput] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { Modal, onShowModal, onCloseModal, onConfirmModal } = useModal(false);

  const onClickImageUpload = useCallback(() => {
    profileInputRef.current.click();
  }, [profileInputRef.current]);

  const uploadImage = useCallback(() => {
    const formData = new FormData();
    formData.append('file', file);
    dispatch(updateUserRequest({ formData }));
    setFile(null);
  }, [file]);

  const onChangeProfileImg = useCallback((e) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    e.target.value = "";
  }, [file]);

  useEffect(() => {
    file && uploadImage();
  }, [file])

  const onChangeName = useCallback((e) => {
    const regType = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/; //특수문자, 공백을 포함하지 않은 2-8자 체크
    if (regType.test(e.target.value) || !e.target.value) {
      setNicknameError(false);
    } else {
      setNicknameError(true);
    }
    setNickname(e.target.value);
  }, [nickname]);

  const onChangePw = useCallback((e) => {
    const regType = /^[A-Za-z0-9]{8,}$/; //영문, 숫자만 사용해서 8자 이상 체크
    if (regType.test(e.target.value)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
    setPassword(e.target.value);
  }, [password]);

  const onActiveNameInput = useCallback(() => {
    if (nicknameError) {
      onShowModal("닉네임을 다시 확인해주세요.");
      return;
    }

    setIsActiveNameInput((prev) => !prev);
    isActiveNameInput && dispatch(updateUserRequest({ usercode: nickname }))
    setNicknameError(null);
  }, [nickname]);

  const onActivePwInput = useCallback(() => {
    if (passwordError) {
      onShowModal("비밀번호를 다시 확인해주세요.");
      return;
    }
    
    setIsActivePwInput((prev) => !prev);
    isActivePwInput && dispatch(updateUserRequest({ password }));
    setPasswordError(null);
  }, [password]);

  const onDeleteProfile = useCallback(() => {
    //TODO: image null로 update dispatch 추가
    
    setFile(null);
  }, []);

  const onBackMyPage = useCallback(() => {
    if (isActiveNameInput || isActivePwInput) {
      onShowModal("수정 중인 값이 있습니다. 취소 후 돌아가시겠습니까?", () => {
        setIsActiveNameInput(false);
        setIsActivePwInput(false);
        setNickname(user?.usercode);
        setPassword(null);
        onClose();
      })
    } else {
      onClose();
    }
  }, [isActiveNameInput, isActivePwInput]);

  return (
      <section className={styles.setting}>
        <Modal />
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
                    <label htmlFor="name">닉네임</label>
                    {nicknameError && <p className={styles.error}>특수문자, 공백을 포함하지 않은 2~8자 이내로 입력해주세요.</p>}

                    {isActiveNameInput ? (
                        <Input type="text" id="name" onChange={onChangeName} value={nickname} />
                    ) : (
                        <Input type="text" id="name" value={nickname} disabled />
                    )}   
                    <button onClick={onActiveNameInput}>{isActiveNameInput ? '저장' : '수정'}</button>
                </div>
                <div className={styles.list}>
                    <label htmlFor="password">변경할 비밀번호</label>
                    {passwordError && <p className={styles.error}>영문, 숫자만을 사용해 8자 이상 입력해주세요.</p>}

                    {isActivePwInput ? (
                        <Input type="password" id="password" onChange={onChangePw} value={password} />
                    ) : (
                        <Input type="password" id="password" value={password} disabled />
                    )}
                    <button onClick={onActivePwInput}>{isActivePwInput ? '저장' : '수정'}</button>
                </div>
            </article>
            <button className={styles.backBtn} onClick={onBackMyPage}><BsFillArrowLeftCircleFill />돌아가기</button>
        </div>
      </section>
  );
};

export default SettingAccount;
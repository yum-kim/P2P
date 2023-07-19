import React, { useRef, useEffect, useCallback, useState } from 'react';
import styles from './ProfileModal.module.scss';
import { BsFillPersonFill, BsChatRightDots, BsXLg } from "react-icons/bs";
import { createPortal } from 'react-dom';
import Button from '../../element/Button/Button';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentChatUserRequest } from '../../../store/slices/chat';
import { RootState } from '../../../store/configureStore';

const ProfileModal = ({ userInfo, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const modalRootRef = useRef<Element | null>(null);
  const router = useRouter();  
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const unlockScroll = useCallback(() => {
      document.body.style.overflow = "auto";
  }, []);
      
  const lockScroll = useCallback(() => {
      document.body.style.overflow = "hidden";
  }, []);

  const onMoveMessage = useCallback(() => {
    dispatch(updateCurrentChatUserRequest({
      userid: userInfo.id,
      username: userInfo.username,
      usercode: userInfo.usercode,
      profileImagePath: userInfo.profileImagePath,
    }));
    router.push('/messenger');
    onClose();
  }, []);

  useEffect(() => {
      setMounted(true);    
      if(document) {
          const dom = document.getElementById('modal');
          modalRootRef.current = dom;
      }

      lockScroll();
      return () => unlockScroll();
  }, [])

  const profileModal = (
    <section className={styles.modalContainer}>
      <div className={styles.modalBg} onClick={onClose}></div>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <BsXLg />
        </button>
        <div className={styles.profile}>
          <div className={styles.profileImg}>
              {userInfo && userInfo.profileImagePath ? <img src={userInfo.profileImagePath} alt="프로필" /> : <BsFillPersonFill />}
          </div>
        </div>
        <div className={styles.user}>
          <p className={styles.usercode}>{userInfo?.usercode}</p>
          <p className={styles.username}>{userInfo?.username}</p>
      </div>
      <div className={styles.btnBox}>
        <Button variant='primary-blue' size="40" onClick={onMoveMessage} disabled={userInfo.id === user.id}><BsChatRightDots />Message</Button>
      </div>
      </div>
    </section>
  )

  if (modalRootRef.current && mounted) {
      return createPortal(profileModal, modalRootRef.current);
  }
};

export default ProfileModal;
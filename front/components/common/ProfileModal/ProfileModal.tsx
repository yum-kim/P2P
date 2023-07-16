import React, { useRef, useEffect, useCallback, useState } from 'react';
import styles from './ProfileModal.module.scss';
import { BsFillPersonFill, BsChatRightDots, BsXLg } from "react-icons/bs";
import { createPortal } from 'react-dom';
import Button from '../../element/Button/Button';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { updateCurrentChatUserRequest } from '../../../store/slices/chat';

const ProfileModal = ({ user, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const modalRootRef = useRef<Element | null>(null);
  const router = useRouter();  
  const dispatch = useDispatch();

  const unlockScroll = useCallback(() => {
      document.body.style.overflow = "auto";
  }, []);
      
  const lockScroll = useCallback(() => {
      document.body.style.overflow = "hidden";
  }, []);

  const onMoveMessage = useCallback(() => {
    dispatch(updateCurrentChatUserRequest({
      userid: user.id,
      username: user.username,
      usercode: user.usercode,
      profileImagePath: user.profileImagePath,
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
              {user && user.profileImagePath ? <img src={user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />}
          </div>
        </div>
        <div className={styles.user}>
          <p className={styles.usercode}>{user?.usercode}</p>
          <p className={styles.username}>{user?.username}</p>
      </div>
      <div className={styles.btnBox}>
        <Button variant='primary-blue' size="40" onClick={onMoveMessage}><BsChatRightDots />Message</Button>
      </div>
      </div>
    </section>
  )

  if (modalRootRef.current && mounted) {
      return createPortal(profileModal, modalRootRef.current);
  }
};

export default ProfileModal;
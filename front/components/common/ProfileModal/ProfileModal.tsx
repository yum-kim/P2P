import React, { useRef, useEffect, useCallback, useState } from 'react';
import styles from './ProfileModal.module.scss';
import { BsFillPersonFill, BsChatRightDots, BsXLg } from "react-icons/bs";
import { createPortal } from 'react-dom';
import Button from '../../element/Button/Button';

const ProfileModal = ({ user, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const modalRootRef = useRef<Element | null>(null);
    
  const unlockScroll = useCallback(() => {
      document.body.style.overflow = "auto";
  }, []);
      
  const lockScroll = useCallback(() => {
      document.body.style.overflow = "hidden";
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
          <p className={styles.username}>{user?.username || '윰'}</p>
          <p className={styles.usercode}>{user?.usercode || 'Yumi'}</p>
      </div>
      <div className={styles.btnBox}>
        <Button variant='primary-blue' size="40"><BsChatRightDots />Message</Button>
      </div>
      </div>
    </section>
  )

  if (modalRootRef.current && mounted) {
      return createPortal(profileModal, modalRootRef.current);
  }
};

export default ProfileModal;
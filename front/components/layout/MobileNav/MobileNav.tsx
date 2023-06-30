import React from 'react';
import styles from './MobileNav.module.scss';
import Link from "next/link";
import { useRouter } from 'next/dist/client/router';
import { BsHouseDoor, BsChatText, BsPersonGear, BsFillPersonFill, BsXLg, BsBoxArrowInRight } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';

const MobileNav = ({ onClose, onLogout }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  return (
    <section className={styles.slide}>
      <div className={styles.slideBox}>
        <button className={styles.closeBtn} onClick={onClose}>
          <BsXLg />
        </button>
        <div className={styles.userInfo}>
          <div className={styles.profile}>
              {user && user.profileImagePath ? <img src={user.profileImagePath} alt="프로필" /> :     <BsFillPersonFill />}
          </div>
          <div className={styles.user}>
            <h2 className={styles.usercode}>{user && user.usercode}<span>, 환영해요!</span></h2>
            <p className={styles.username}>{user && user.username}</p>
          </div>
        </div>
        <div className={styles.navList}>
            <Link href="/feed" className={router.pathname == '/feed' ? styles.active : undefined}>
                <BsHouseDoor />
                Feed
            </Link>
            <Link href="/messenger" className={router.pathname == '/messenger' ? styles.active : undefined}>
                <BsChatText />
                Message 
            </Link>
            <Link href="/mypage" className={router.pathname == '/mypage' ? styles.active : undefined}>
                <BsPersonGear />
                My Page
            </Link>
        </div>
        <div className={styles.btmArea}>
          <button className={styles.logoutBtn} onClick={onLogout}>
              <BsBoxArrowInRight /> 로그아웃
          </button>
        </div>
      </div>
    </section>
  );
};

export default MobileNav;
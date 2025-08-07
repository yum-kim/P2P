import React, { useState, useCallback, useEffect } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import Search from '../../common/Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { BsBoxArrowInRight, BsBell } from 'react-icons/bs';
import { FcMenu } from 'react-icons/fc';
import { useRouter } from 'next/dist/client/router';
import { logOutRequest } from '../../../store/slices/auth';
import useModal from '../../../hooks/useModal';
import { RootState } from '../../../store/configureStore';
import MobileNav from '../MobileNav/MobileNav';
import Slider from '../../common/Slider/Slider';
import Profile from '../../common/Profile/Profile';
import { Icon } from 'p2p-ui';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { Modal, onShowModal } = useModal(false);
  const [isShowSlideBox, setIsShowSlideBox] = useState(false);

  const onClickLogout = useCallback(() => {
    onShowModal('로그아웃 하시겠습니까?', {
      confirm: () => {
        dispatch(logOutRequest(null));
        router.push('/login');
      },
    });
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = 'auto';
  }, []);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const onClickHamburger = useCallback(() => {
    setIsShowSlideBox(true);
  }, []);

  const onCloseSlideBox = useCallback(() => {
    setIsShowSlideBox(false);
  }, []);

  useEffect(() => {
    if (isShowSlideBox) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isShowSlideBox]);

  return (
    <header className={styles.headerWrapper}>
      <Modal />
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className={styles.header}>
              <h1 className={styles.logo}>
                <Link href="/">
                  <Icon icon="Logo" width="30" height="30" />
                  <span>PTOP</span>
                </Link>
              </h1>
              {/* <div className={`lg-only ${styles.search}`}>
                                <Search placeholder='search' />
                            </div> */}
              <div className={`${styles.rightArea} lg-only`}>
                <button className={styles.icon}>
                  <BsBell />
                </button>
                <button className={styles.icon} onClick={onClickLogout}>
                  <BsBoxArrowInRight />
                </button>
                <div className={styles.profile}>
                  <Profile user={user} />
                </div>
              </div>
              <div className={`lg-hidden ${styles.mobileNav}`}>
                <button className={styles.hamburger} onClick={onClickHamburger}>
                  <FcMenu />
                </button>

                {isShowSlideBox && <div className={styles.slideBoxBg} onClick={onCloseSlideBox}></div>}
                <Slider visible={isShowSlideBox} options={{ direction: 'left', top: '0px', speed: 0.4, width: '80vw' }}>
                  <MobileNav onClose={onCloseSlideBox} onLogout={onClickLogout} />
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

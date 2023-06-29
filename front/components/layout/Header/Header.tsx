import React from 'react';
import styles from './Header.module.scss';
import Link from "next/link";
import Search from '../../common/Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { BsBoxArrowInRight, BsBell, BsFillPersonFill } from "react-icons/bs";
import { useRouter } from 'next/dist/client/router';
import { logOutRequest } from '../../../store/slices/auth';
import useModal from '../../../hooks/useModal';
import { RootState } from '../../../store/configureStore';

const Header = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const { Modal, onShowModal } = useModal(false);

    const onClickLogout = () => {
        onShowModal("로그아웃 하시겠습니까?", {
            confirm: () => {
                dispatch(logOutRequest(null));
                router.push('/login');
            }
        })
    }

    return (
        <header className={styles.headerWrapper}>
            <Modal />
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <div className={styles.header}>
                            <h1 className={styles.logo}>
                                <Link href='/'>
                                    <img src='images/extension_icon.svg' alt='로고' />
                                        PTOP
                                </Link>
                            </h1>
                            <div className={`lg-only ${styles.search}`}>
                                <Search placeholder='search' />
                            </div>
                            <div className={styles.rightArea}>
                                <button className={styles.icon}>
                                    <BsBell />
                                </button>
                                <button className={styles.icon} onClick={onClickLogout}>
                                    <BsBoxArrowInRight />
                                </button>
                                <div className={styles.profile}>
                                    {user && user.profileImagePath ? <img src={user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
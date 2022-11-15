import React from 'react';
import styles from './Header.module.scss';
import Link from "next/link";
import Button from '../common/Button';
import Search from '../common/Search';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMessage } from '../../reducers/message';

const Header = () => {
    const { isShowing } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const onClickToggleMsg = () => {
        dispatch(toggleMessage(!isShowing));
    }

    return (
        <header className={styles.headerWrapper}>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <div className={styles.header}>
                            <h1 className={styles.logo}>
                                <Link href='/'>
                                    <a>
                                        <img src='images/test-logo.png' alt='로고' />
                                    </a>
                                </Link>
                            </h1>
                            <div className={`lg-only ${styles.search}`}>
                                <Search placeholder='search' />
                            </div>
                            <div>
                                <button className={`${styles.icon} ${isShowing ? styles.active : ''}`} onClick={onClickToggleMsg}>
                                    <i class="bi bi-chat-dots"></i>
                                </button>
                                <button className={styles.icon}>
                                    <i class="bi bi-bell"></i>
                                </button>
                                <button className={styles.icon}>
                                    <i class="bi bi-box-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
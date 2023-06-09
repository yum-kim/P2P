import React from 'react';
import styles from './Header.module.scss';
import Link from "next/link";
import Button from '../../element/Button/Button';
import Search from '../../common/Search/Search';
import { useSelector, useDispatch } from 'react-redux';
import { logoutRequestAction } from '../../../store/actions/auth';
import { BsBoxArrowInRight, BsBell } from "react-icons/bs";

const Header = () => {
    const dispatch = useDispatch();
    const onClickLogout = () => {
        dispatch(logoutRequestAction());
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
                                        <img src='images/extension_icon.svg' alt='로고' />
                                        PTOP
                                    </a>
                                </Link>
                            </h1>
                            <div className={`lg-only ${styles.search}`}>
                                <Search placeholder='search' />
                            </div>
                            <div>
                                <button className={styles.icon}>
                                    <BsBell />
                                </button>
                                <button className={styles.icon} onClick={onClickLogout}>
                                    <BsBoxArrowInRight />
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
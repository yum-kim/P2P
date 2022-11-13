import React from 'react';
import styles from './Header.module.scss';
import Link from "next/link";
import Button from '../common/Button';
import Search from '../common/Search';

const Header = () => {
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
                                <button className={styles.icon}>
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
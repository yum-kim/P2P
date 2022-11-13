import React from 'react';
import Link from "next/link";
import styles from './Nav.module.scss';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <a>
                    <i className="bi bi-house"></i>
                    Feed
                </a>
            </Link>
            <Link href="/myPage">
                <a>
                    <i class="bi bi-box"></i>
                    My page
                </a>
            </Link>
        </nav>
    );
};

export default Nav;
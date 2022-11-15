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
            <Link href="/messenger">
                <a>
                    <i class="bi bi-box"></i>
                    Message 
                </a>
            </Link>
        </nav>
    );
};

export default Nav;
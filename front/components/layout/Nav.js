import React from 'react';
import Link from "next/link";
import styles from './Nav.module.scss';
import { useRouter } from 'next/dist/client/router';

const Nav = () => {
    const router = useRouter();

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <a className={router.pathname == '/' ? styles.active : ''}>
                    <i className="bi bi-house"></i>
                    Feed
                </a>
            </Link>
            <Link href="/messenger">
                <a className={router.pathname == '/messenger' ? styles.active : ''}>
                    <i class="bi bi-chat-left-text"></i>
                    Message 
                </a>
            </Link>
        </nav>
    );
};

export default Nav;
import React from 'react';
import Link from "next/link";
import styles from './Nav.module.scss';
import { useRouter } from 'next/dist/client/router';
import { BsHouseDoor, BsChatText } from "react-icons/bs";

const Nav = () => {
    const router = useRouter();

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <a className={router.pathname == '/' ? styles.active : ''}>
                    <BsHouseDoor />
                    Feed
                </a>
            </Link>
            <Link href="/messenger">
                <a className={router.pathname == '/messenger' ? styles.active : ''}>
                    <BsChatText />
                    Message 
                </a>
            </Link>
        </nav>
    );
};

export default Nav;
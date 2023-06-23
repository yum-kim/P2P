import React from 'react';
import Link from "next/link";
import styles from './Nav.module.scss';
import { useRouter } from 'next/dist/client/router';
import { BsHouseDoor, BsChatText, BsPersonGear } from "react-icons/bs";

const Nav = () => {
    const router = useRouter();

    return (
        <nav className={styles.nav}>
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
        </nav>
    );
};

export default Nav;
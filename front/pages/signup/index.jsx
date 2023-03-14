//회원가입 페이지
import React from 'react';
import Head from 'next/head';
import styles from './signup.module.scss';
import Input from '../../components/element/Input/Input';
import Button from '../../components/element/Button/Button';
import Link from 'next/link';

const Signup = () => {
    return (
        <>
            <Head>
                <title>P2P | 회원가입</title>
            </Head>
            <div className={styles.signup}>
                <h2 className={styles.logo}>
                    <img src='images/extension_icon.svg' alt='로고' />
                </h2>
                <div className={styles.signupWrapper}>
                    <div className={styles.form}>
                        <label htmlFor="name">Name</label>
                        <Input placeholder='Name' />
                        <label htmlFor="email">Email</label>
                        <Input placeholder='ptop@ptop.com' />
                        <label htmlFor="password">Password</label>
                        <Input type='password' placeholder='Password' />
                        <label htmlFor="password">Confirm Password</label>
                        <Input type='password' placeholder='Confirm Password' />
                        <Button varient='secondary' size='40'>회원가입</Button>
                    </div>
                    <div className={styles.login}>
                        <p>이미 가입된 계정이 있으신가요?</p>
                        <Link href='/login'>
                            <a>
                                <Button size='36'>Login</Button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
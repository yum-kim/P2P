//login
import React, { useState } from 'react';
import Head from 'next/head';
import styles from './login.module.scss';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState();
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const [password, setPassword] = useState();
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const dispatch = useDispatch();
    const onClickLogin = () => {
        dispatch(loginAction({ email, password }));
    };

    return (
        <>
            <Head>
                <title>P2P | login</title>
            </Head>
            <div className={styles.login}>
                <h2 className={styles.logo}>
                    <img src='images/test-logo.png' alt='로고' />
                </h2>
                <div className={styles.loginWrapper}>
                    <div className={styles.email}>
                        <label htmlFor="email">Email</label>
                        <Input placeholder='ptop@ptop.com' id='email' onChange={onChangeEmail} />
                    </div>
                    <div className={styles.password}>
                        <label htmlFor="password">Password</label>
                        <Input type='password' id='password' onChange={onChangePassword} />
                    </div>
                    <Button size='40' onClick={onClickLogin}>Login</Button>
                    <Button size='36' varient='outlined'>Sign in with Google</Button>
                    <div className={styles.divider}></div>
                    <Link href='/signup'>
                        <a>
                            <Button size='36' varient='secondary'>Sign up</Button>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
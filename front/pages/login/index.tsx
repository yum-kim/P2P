//login
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './login.module.scss';
import Input from '../../components/element/Input/Input';
import Button from '../../components/element/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Loading from '../../components/common/Loading/Loading';
import useModal from '../../hooks/useModal';
import { RootState } from '../../store/configureStore';
import { logInRequest } from '../../store/slices/auth';
import useInput from '../../hooks/useInput';

const Login = () => {
    const [username, onChangeUsername] = useInput('');
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();
    const router = useRouter();
    const { logInLoading, logInDone, logInError, logOutDone, expireRefreshTokenError, user } = useSelector((state: RootState) => state.auth);
    const { Modal, onShowModal } = useModal(false);

    const onSubmitLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !password) {
            onShowModal("빈 값이 있습니다.");
            return;
        }
        dispatch(logInRequest({ username, password }));
    }

    useEffect(() => {
        expireRefreshTokenError && !user && onShowModal("토큰이 만료되어 권한이 없습니다. 재로그인 해주세요.");
    }, [expireRefreshTokenError])
    
    useEffect(() => {
        logInError && onShowModal(logInError.message);
    }, [logInError])

    useEffect(() => {
        logInDone && user && router.push('/feed');
    }, [logInDone])

    useEffect(() => {
        if (!expireRefreshTokenError && logOutDone && !user) {
            onShowModal("로그아웃이 완료되었습니다.");
        }
    }, [logOutDone])

    return (
        <>
            <Head>
                <title>P2P | login</title>
            </Head>
            {logInLoading && <Loading />}
            <Modal />

            <div className={styles.login}>
                <h2 className={styles.logo}>
                    <img src='images/extension_icon.svg' alt='로고' />
                </h2>
                <div className={styles.loginWrapper}>
                    <form onSubmit={onSubmitLogin}>
                        <div className={styles.username}>
                            <label htmlFor="id">Username</label>
                            <Input type='text' placeholder='username' id='id' onChange={onChangeUsername} />
                        </div>
                        <div className={styles.password}>
                            <label htmlFor="password">Password</label>
                            <Input type='password' placeholder='password' id='password' onChange={onChangePassword} />
                        </div>
                        <Button type='submit' size='40'>Login</Button>
                    </form>
                    <Button size='36' variant='outlined'>Sign in with Google</Button>
                    <div className={styles.divider}></div>
                    <Link href='/signup'>
                        <Button size='36' variant='secondary'>Sign up</Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
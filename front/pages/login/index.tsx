//login
import React, { useState, useEffect, useCallback } from 'react';
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
import { logInRequest, issueAccessTokenRequest, resetSpecificAuth, resetAllAuthError, resetAllAuth } from '../../store/slices/auth';
import useInput from '../../hooks/useInput';
import { getCookie, TOKEN_COOKIE_NAME } from '../../utils/cookie';
import { resetAllPostError } from '../../store/slices/post';

const Login = () => {
    const [username, onChangeUsername] = useInput('');
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();
    const router = useRouter();
    const { logInLoading, logInError, logOutDone, expireRefreshTokenError, user, issueAccessTokenLoading, removeAccountDone } = useSelector((state: RootState) => state.auth);
    const { Modal, onShowModal } = useModal(false);

    const onSubmitLogin = useCallback(async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !password) {
            onShowModal("빈 값이 있습니다.");
            return;
        }

        dispatch(logInRequest({ username, password }));
    }, [username, password]);

    useEffect(() => {
        if (expireRefreshTokenError) {
            onShowModal("토큰이 만료되어 권한이 없습니다. 재로그인 해주세요.", {
                cancel: () => {
                    dispatch(resetAllAuth());
                    dispatch(resetAllPostError());
                }
            });
        }
    }, [expireRefreshTokenError]);
    
    useEffect(() => {
        logInError && onShowModal(logInError.message, {
            cancel: () => {
                dispatch(resetSpecificAuth("logInError"));
            }
        });
    }, [logInError]);

    useEffect(() => {
        !logOutDone && user && router.push('/feed');
    }, [user, logOutDone]);

    useEffect(() => {
        if (!expireRefreshTokenError && !removeAccountDone && logOutDone && !user) {
            onShowModal("로그아웃이 완료되었습니다.", {
                cancel: () => {
                    dispatch(resetSpecificAuth("logOutDone"));
                }
            });
        }
    }, [logOutDone]);

    useEffect(() => {
        if (removeAccountDone) {
            onShowModal("회원탈퇴로 로그아웃 처리 되었습니다.", {
                cancel: () => {
                    dispatch(resetSpecificAuth("removeAccountDone"));
                }
            });
        }
    }, [removeAccountDone]);

    useEffect(() => {
        const refreshToken = getCookie(TOKEN_COOKIE_NAME);
        refreshToken && dispatch(issueAccessTokenRequest());
    }, [])

    return (
        <>
            <Head>
                <title>P2P | login</title>
            </Head>
            {logInLoading || issueAccessTokenLoading && <Loading />}
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
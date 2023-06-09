//login
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './login.module.scss';
import Input from '../../components/element/Input/Input';
import Button from '../../components/element/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { loginRequestAction } from '../../store/actions/auth';
import Loading from '../../components/common/Loading/Loading';
import { RootState } from '../../store/reducers';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const { logInLoading, logInDone, logInError } = useSelector((state: RootState) => state.auth);

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);

    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onSubmitLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !password) {
            alert("빈 값이 있습니다.");
            return;
        }
        dispatch(loginRequestAction({ username, password }));
    }

    useEffect(() => {
        if (logInError) {
            alert(logInError.message);
        }
    }, [logInError])

    useEffect(() => {
        if (logInDone) {
            router.push('/feed');
        }
    }, [logInDone])

    return (
        <>
            <Head>
                <title>P2P | login</title>
            </Head>
            {logInLoading && <Loading />}

            <div className={styles.login}>
                <h2 className={styles.logo}>
                    <img src='images/extension_icon.svg' alt='로고' />
                </h2>
                <div className={styles.loginWrapper}>
                    <form onSubmit={onSubmitLogin}>
                        <div className={styles.username}>
                            <label htmlFor="username">Username</label>
                            <Input type='text' placeholder='username' id='username' onChange={onChangeUsername} />
                        </div>
                        <div className={styles.password}>
                            <label htmlFor="password">Password</label>
                            <Input type='password' id='password' onChange={onChangePassword} />
                        </div>
                        <Button type='submit' size='40'>Login</Button>
                    </form>
                    <Button size='36' varient='outlined'>Sign in with Google</Button>
                    <div className={styles.divider}></div>
                    <Link href='/signup'>
                        <a><Button size='36' varient='secondary'>Sign up</Button></a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
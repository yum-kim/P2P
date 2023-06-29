//회원가입 페이지
import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import styles from './signup.module.scss';
import Input from '../../components/element/Input/Input';
import Button from '../../components/element/Button/Button';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/common/Loading/Loading';
import { RootState } from '../../store/configureStore';
import useModal from '../../hooks/useModal';
import { signUpRequest, resetSpecificAuth } from '../../store/slices/auth';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [nicknameError, setNicknameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { signUpLoading, signUpDone, signUpError } = useSelector((state: RootState) => state.auth);
    const { Modal, onShowModal } = useModal(false);

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regType = /^[A-Za-z0-9]{3,}$/; //영문, 숫자만 사용해서 3자 이상 체크
        if (regType.test(e.target.value)) {
            setUsernameError(false);
        } else {
            setUsernameError(true);
        }
        setUsername(e.target.value);
    };

    const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regType = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/; //특수문자, 공백을 포함하지 않은 2-8자 체크
        if (regType.test(e.target.value) || !e.target.value) {
            setNicknameError(false);
        } else {
            setNicknameError(true);
        }
        setNickname(e.target.value);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regType = /^[A-Za-z0-9]{8,}$/; //영문, 숫자만 사용해서 8자 이상 체크
        if (regType.test(e.target.value)) {
            setPasswordError(false);
        } else {
            setPasswordError(true);
        }
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (password === e.target.value) {
            setConfirmPasswordError(false);
        } else {
            setConfirmPasswordError(true);
        }
        setConfirmPassword(e.target.value);
    };

    const onClickSignup = () => {
        if (usernameError || nicknameError || passwordError || confirmPasswordError) {
            onShowModal("입력된 정보를 확인해주세요.");
            return;
        }
        dispatch(signUpRequest({ username, usercode: nickname, password }));
    }

    useEffect(() => {
        if (signUpError) {
            onShowModal(`회원가입 중 오류가 발생했습니다. ${signUpError.message}`, {
                cancel: () => {
                    dispatch(resetSpecificAuth("signUpError"));
                }
            });
        }
    }, [signUpError]);

    useEffect(() => {
        if (signUpDone) {
            onShowModal("회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.", {
                cancel: () => {
                    router.push('/login');
                }
            });
        }
    }, [signUpDone]);

    return (
        <>
            <Head>
                <title>P2P | 회원가입</title>
            </Head>
            {signUpLoading && <Loading />}

            <Modal />

            <div className={styles.signup}>
                <h2 className={styles.logo}>
                    <img src='images/extension_icon.svg' alt='로고' />
                </h2>
                <div className={styles.signupWrapper}>
                    <div className={styles.form}>
                        <label htmlFor="username">Username</label>
                        <Input id="username" type="text" placeholder='Username' value={username} onChange={onChangeUsername} />
                        {usernameError && <p className={styles.error}>영문, 숫자만을 사용해 3자 이상 입력해주세요.</p>}

                        <label htmlFor="nickname">Nickname</label>
                        <Input id="nickname" type="text" placeholder='Nickname' value={nickname} onChange={onChangeNickname} />
                        {nickname.length > 0 && nicknameError && <p className={styles.error}>특수문자, 공백을 포함하지 않은 2~8자 이내로 입력해주세요.</p>}
                        {!nickname && <p className={styles.error}>빈 값으로 제출 시 닉네임이 자동 생성됩니다.</p>}

                        <label htmlFor="password1">Password</label>
                        <Input id="password1" type='password' placeholder='Password' value={password} onChange={onChangePassword} />
                        {passwordError && <p className={styles.error}>영문, 숫자만을 사용해 8자 이상 입력해주세요.</p>}

                        <label htmlFor="password2">Confirm Password</label>
                        <Input id="password2" type='password' placeholder='Confirm Password' value={confirmPassword} onChange={onChangeConfirmPassword} />
                        {confirmPasswordError && <p className={styles.error}>비밀번호가 일치하지 않습니다.</p>}
                        
                        <Button variant='secondary' size='40' onClick={onClickSignup}>Sign up</Button>
                    </div>
                    <div className={styles.login}>
                        <p>이미 가입된 계정이 있으신가요?</p>
                        <Link href='/login'>
                            <Button size='36'>Login</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
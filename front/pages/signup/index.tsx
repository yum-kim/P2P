//회원가입 페이지
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import styles from './signup.module.scss';
import Input from '../../components/element/Input/Input';
import Button from '../../components/element/Button/Button';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/common/Loading/Loading';
import { signupRequestAction } from '../../store/actions/auth';
import { RootState } from '../../store/reducers';
import Modal from '../../components/layout/Modal/Modal';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { signUpLoading, signUpDone, signUpError } = useSelector((state: RootState) => state.auth);
    const [isShowModal, setIsShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regType = /^[A-Za-z0-9]*$/; //영문, 숫자만 사용해서 3자 이상 체크
        if (regType.test(e.target.value) && e.target.value.length >= 3) {
            setUsernameError(false);
        } else {
            setUsernameError(true);
        }
        setUsername(e.target.value);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regType = /^[A-Za-z0-9]*$/; //영문, 숫자만 사용해서 8자 이상 체크
        if (regType.test(e.target.value) && e.target.value.length >= 8) {
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
        if (usernameError || passwordError || confirmPasswordError) {
            setIsShowModal(true);
            setModalContent("입력된 정보를 확인해주세요.");
            return;
        }
        dispatch(signupRequestAction({ username, password }));
    }

    useEffect(() => {
        if (signUpError) {
            setIsShowModal(true);
            setModalContent("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    }, [signUpError]);

    useEffect(() => {
        if (signUpDone) {
            setIsShowModal(true);
            setModalContent("회원가입이 완료되었습니다. 로그인 후 이용해주세요.");
            router.push('/login');
        }
    }, [signUpDone]);

    return (
        <>
            <Head>
                <title>P2P | 회원가입</title>
            </Head>
            {signUpLoading && <Loading />}

            {isShowModal &&
                <Modal setIsShowModal={setIsShowModal}>
                    <p>{modalContent}</p>
                </Modal>
            }

            <div className={styles.signup}>
                <h2 className={styles.logo}>
                    <img src='images/extension_icon.svg' alt='로고' />
                </h2>
                <div className={styles.signupWrapper}>
                    <div className={styles.form}>
                        <label htmlFor="email">Username</label>
                        <Input type="text" placeholder='Username' value={username} onChange={onChangeUsername} />
                        {usernameError && <p className={styles.error}>영문, 숫자만을 사용해 3자 이상 입력해주세요.</p>}

                        <label htmlFor="password">Password</label>
                        <Input type='password' placeholder='Password' value={password} onChange={onChangePassword} />
                        {passwordError && <p className={styles.error}>영문, 숫자만을 사용해 8자 이상 입력해주세요.</p>}

                        <label htmlFor="password">Confirm Password</label>
                        <Input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={onChangeConfirmPassword} />
                        {confirmPasswordError && <p className={styles.error}>비밀번호가 일치하지 않습니다.</p>}
                        
                        <Button varient='secondary' size='40' onClick={onClickSignup}>회원가입</Button>
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
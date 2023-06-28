import Head from 'next/head';
import AppLayout from "../../components/layout/AppLayout/AppLayout";
import styles from './mypage.module.scss';
import { BsFillPersonFill, BsFileEarmarkPersonFill } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { useCallback, useState, useEffect } from 'react';
import Slider from '../../components/common/Slider/Slider';
import SettingAccount from '../../components/component/SettingAccount/SettingAccount';
import Loading from '../../components/common/Loading/Loading';
import useModal from '../../hooks/useModal';
import { removeAccountRequest } from '../../store/slices/auth';
import { useRouter } from 'next/router';

const mypage = () => {
    const { user, removeAccountLoading, removeAccountDone, removeAccountError } = useSelector((state: RootState) => state.auth);
    const [visible, setVisible] = useState(false);
    const { Modal, onShowModal } = useModal(false);
    const dispatch = useDispatch();
    const router = useRouter();
    
    const onClickSettingAccountSlider = useCallback(() => {
        setVisible(true);
    }, [visible])

    const onCloseSettingAccountSlider = useCallback(() => {
        setVisible(false);
    }, [visible]);

    const onClickRemoveAccount = useCallback(() => {
        onShowModal("회원탈퇴 시 복구할 수 없습니다. 계속 진행하시겠습니까?", () => {
            dispatch(removeAccountRequest());
        })
    }, []);

    useEffect(() => {
        if (removeAccountError) {
            onShowModal(`회원탈퇴 중 오류가 발생했습니다. ${removeAccountError.message}`);
        }
    }, [removeAccountError]);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>P2P | My Page</title>
            </Head>
            <AppLayout>
                {removeAccountLoading && <Loading />}
                <Modal />
                
                {/* {!visible && ( */}
                <section className={styles.mypage}>
                    <div className={styles.mypageWrapper}>
                        <article className={styles.profile}>
                            <div className={styles.profileImg}>
                                {user && user.profileImagePath ? <img src={user.profileImagePath} alt="" /> : <BsFillPersonFill />}
                            </div>
                        </article>
                        <article className={styles.user}>
                            <p className={styles.username}>{user && user.username}</p>
                            <p className={styles.usercode}>{user && user.usercode}</p>
                        </article>
                        <article className={styles.btnBox}>
                            <ul>
                                <li>
                                    <button onClick={onClickSettingAccountSlider}>계정설정<AiOutlineRight /></button>
                                </li>
                                {/* <li>
                                    <button disabled>알림설정<AiOutlineRight /></button>
                                </li>
                                <li>
                                    <button disabled>언어변경<AiOutlineRight /></button>
                                </li> */}
                                <li>
                                    <button onClick={onClickRemoveAccount}>회원탈퇴<AiOutlineRight /></button>
                                </li>
                            </ul>
                        </article>
                    </div>
                </section>
                {/* )} */}
                
                <Slider visible={visible}>
                    <SettingAccount onClose={onCloseSettingAccountSlider}/>
                </Slider>
                    
            </AppLayout>
        </>
    );
};

export default mypage;
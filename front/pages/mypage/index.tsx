import Head from 'next/head';
import AppLayout from "../../components/layout/AppLayout/AppLayout";
import styles from './mypage.module.scss';
import { BsFillPersonFill, BsFileEarmarkPersonFill } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { useRef, useCallback, useState, useEffect } from 'react';
import Slider from '../../components/common/Slider/Slider';
import SettingAccount from '../../components/component/SettingAccount/SettingAccount';
import Loading from '../../components/common/Loading/Loading';

const mypage = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [visible, setVisible] = useState(false);
    
    const onClickSettingAccountSlider = useCallback(() => {
        setVisible(true);
    }, [visible])

    const onCloseSettingAccountSlider = useCallback(() => {
        setVisible(false);
    }, [visible]);

    return (
        <>
            <Head>
                <title>P2P | My Page</title>
            </Head>
            <AppLayout>
                {/* <Loading /> */}

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
                                    <button>회원탈퇴<AiOutlineRight /></button>
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
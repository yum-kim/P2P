import React, { useCallback, useState } from 'react';
import styles from './Profile.module.scss';
import {  BsFillPersonFill } from "react-icons/bs";
import ProfileModal from '../ProfileModal/ProfileModal';

const Profile = ({ user }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsShowDetail(false);
  }, []);

  const onClickProfile = useCallback(() => {
    //프로필 상세 화면으로
    setIsShowDetail(true);
  }, []);

  return (
    <>
      <div className={styles.profile} onClick={onClickProfile}>
          {user?.profileImagePath ? <img src={user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />}
      </div>

      {isShowDetail && (
        <ProfileModal user={user} onClose={onCloseModal} />
      )}
    </>
  );
};

export default Profile;
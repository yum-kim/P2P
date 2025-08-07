'use client';

import React, { useCallback, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';

const Profile = ({ user }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsShowDetail(false);
  }, []);

  const onClickProfile = useCallback((e) => {
    e.stopPropagation();

    //프로필 상세 화면으로
    setIsShowDetail(true);
  }, []);

  return (
    <>
      <div className="" onClick={onClickProfile}>
        {user?.profileImagePath ? <img src={user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />}
      </div>

      {/* {isShowDetail && <ProfileModal userInfo={user} onClose={onCloseModal} />} */}
    </>
  );
};

export default Profile;

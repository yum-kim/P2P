'use client';

import { BsFillPersonFill } from 'react-icons/bs';

const Profile = () => {
  return (
    <>
      <div className="w-[28px] h-[28px] border rounded-[50%] border-p2p-tertiary overflow-hidden relative text-[30px] text-p2p-secondary">
        <BsFillPersonFill className="absolute transform translate-x-[-50%] left-[50%]" />
      </div>
    </>
  );
};

export default Profile;

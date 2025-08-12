'use client';

import { BsFillPersonFill } from 'react-icons/bs';

interface ProfileProps {
  imageUrl?: string;
}

const Profile = ({ imageUrl }: ProfileProps) => {
  return (
    <>
      <div className="w-[28px] h-[28px] border rounded-[50%] border-p2p-tertiary overflow-hidden relative text-[30px] text-p2p-tertiary">
        {imageUrl ? (
          <img src={imageUrl} alt="프로필 이미지" className="object-cover" />
        ) : (
          <BsFillPersonFill className="absolute transform translate-x-[-50%] left-[50%]" />
        )}
      </div>
    </>
  );
};

export default Profile;

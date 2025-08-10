'use client';

import { ContainedButton, Textarea } from 'p2p-ui';
import React from 'react';
import Profile from './common/Profile';
import { BsCloudUpload, BsFileImage } from 'react-icons/bs';

const PostForm = () => {
  return (
    <div className="flex flex-col">
      <div className="relative flex gap-x-[10px] flex-1 mb-[10px]">
        <Profile />
        <Textarea placeholder="오늘은 어떤 일이 있었나요? 😄" className="flex-1" />
        <button className="absolute bottom-[10px] right-[10px] rounded-[50%] text-p2p-blue text-p2p-18 border border-p2p-blue border-solid p-[4px] bg-p2p-white hover:bg-p2p-blue-light flex items-center">
          <BsFileImage />
        </button>
      </div>
      <ContainedButton color="black" className="self-end">
        <div className="flex items-center gap-x-[6px]">
          <BsCloudUpload />
          <span className="text-p2p-14">업로드</span>
        </div>
      </ContainedButton>
    </div>
  );
};

export default PostForm;

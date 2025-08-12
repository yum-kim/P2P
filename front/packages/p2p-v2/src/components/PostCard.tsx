'use client';

import React from 'react';
import Profile from './common/Profile';
import { MdPublic } from 'react-icons/md';
import { BsChatLeftTextFill, BsLockFill, BsThreeDots } from 'react-icons/bs';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import PostImage from './PostImage';
import Comment from './Comment';

const PostCard = () => {
  return (
    <>
      <article className="px-[20px] border border-solid rounded-[8px] py-[20px] bg-p2p-white">
        <div className="flex items-center gap-x-[10px]">
          <Profile />
          <div className="flex flex-col">
            <p className="text-p2p-12 font-bold">
              Yumi <span className="text-p2p-12 font-medium">(유미)</span>
            </p>
            <div className="flex items-center gap-x-[4px]">
              <p className="text-p2p-secondary text-p2p-12">2025-08-12 12:02:00</p>
              <span className="text-p2p-secondary text-p2p-12">
                <MdPublic title="전체공개" />
                {/* <BsLockFill title="나만보기" /> */}
              </span>
            </div>
          </div>
          <button className="ml-auto hover:bg-p2p-background rounded-[10px] p-[10px]">
            <BsThreeDots />
          </button>
        </div>
        <div className="py-[20px]">
          <PostImage images={['/flower.jpeg']} />
          <p>게시물 첫번째</p>
        </div>
        <div className="flex gap-x-[14px]">
          <button className="flex items-center gap-x-[4px] text-p2p-12">
            <FcLike /> 1{/* <FcLikePlaceholder /> */}
          </button>
          <button className="flex items-center gap-x-[4px] text-p2p-12">
            <BsChatLeftTextFill /> 댓글 1{/* <BsChatLeftText /> */}
          </button>
        </div>
        <Comment />
      </article>
    </>
  );
};

export default PostCard;

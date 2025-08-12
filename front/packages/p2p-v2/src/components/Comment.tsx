import { Input } from 'p2p-ui';
import React from 'react';
import { BsPencil, BsSend, BsTrash3 } from 'react-icons/bs';
import Profile from './common/Profile';

const Comment = () => {
  return (
    <div className="pt-[14px] mt-[14px] border-t border-solid border-p2p-border">
      <p className="pb-[14px] text-p2p-14">0개의 댓글이 있습니다.</p>
      <CommentForm />

      <div className="py-[14px] flex flex-col gap-y-[8px]">
        <CommentItem />
      </div>
    </div>
  );
};

export default Comment;

const CommentForm = () => {
  return (
    <div className="relative">
      <Input className="bg-p2p-background pr-[34px]" placeholder="댓글을 입력하세요." />
      <button className="w-[24px] absolute right-[5px] top-[50%] transform translate-y-[-50%]">
        <BsSend />
      </button>
    </div>
  );
};

const CommentItem = () => {
  return (
    <div className="flex gap-x-[10px]">
      <Profile />
      <div className="flex flex-col flex-1 gap-y-[4px]">
        <p className="text-p2p-12 text-p2p-secondary">Yumi (유미)</p>
        <div className="text-p2p-14">
          댓글 내용 우다닷
          <span className="text-p2p-12">
            <span className="text-p2p-secondary ml-[4px]">2025-08-12 12:02:00</span>
            <span className="text-p2p-secondary ml-[4px]">(수정됨)</span>
            <span className="text-p2p-primary ml-[6px]">
              <button className="mr-[3px]">
                <BsPencil />
              </button>
              <button>
                <BsTrash3 />
              </button>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

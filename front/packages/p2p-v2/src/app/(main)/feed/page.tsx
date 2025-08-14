'use client';

import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';
import { Portal } from 'p2p-ui';
import React from 'react';

const Feed = () => {
  return (
    <div className="flex flex-col gap-y-[20px]">
      <PostForm />

      <section className="flex flex-col gap-y-[10px]">
        {/* <p className="text-center">등록된 포스트가 없어요. 😂</p> */}
        <PostCard />
        <PostCard />
        <PostCard />
      </section>
    </div>
  );
};

export default Feed;

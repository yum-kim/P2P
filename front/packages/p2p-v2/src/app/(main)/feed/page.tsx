'use client';

import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';
import React from 'react';

const Feed = () => {
  return (
    <div className="flex flex-col gap-y-[20px]">
      <PostForm />
      <section className="">
        <PostCard />
      </section>
    </div>
  );
};

export default Feed;

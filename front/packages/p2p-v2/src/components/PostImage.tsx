'use client';

import React from 'react';

interface PostImageProps {
  images: string[];
}

const PostImage = ({ images }: PostImageProps) => {
  if (images.length === 1) {
    return (
      <div className="mb-[10px] w-full">
        <img src={images[0]} alt="" className="w-full lg:max-w-[50%] h-full object-contain" />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="mb-[10px] w-full grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-[4px]">
        {images.map((src, idx) => (
          <div key={idx} className="h-[500px]">
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="mb-[10px] grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 w-full gap-[4px] md:max-h-[600px]">
        <div className="md:col-span-1 md:row-span-2 md:max-h-full max-h-[500px]">
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-h-[500px] md:max-h-full">
          <img src={images[1]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-h-[500px] md:max-h-full">
          <img src={images[2]} alt="" className="w-full h-full object-cover" />
        </div>
        {/* {images.map((src, idx) => (
          <img key={idx} src={src} alt="" className="w-full h-auto object-cover" />
        ))} */}
      </div>
    );
  }

  if (images.length === 4) {
    return (
      <div className="mb-[10px] grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 w-full gap-[4px] lg:max-h-[600px]">
        {images.map((src, idx) => (
          <div key={idx} className="lg:max-h-full max-h-[500px]">
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    );
  }
};

export default PostImage;

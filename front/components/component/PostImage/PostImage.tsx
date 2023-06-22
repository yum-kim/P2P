import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './PostImage.module.scss';
import Image from 'next/image';
import { IPostImage } from '../PostCard/PostCard';

interface IImageLoaderProps {
  src: string;
  onLoad: (size: { width: number; height: number }) => void;
}

interface IPostImageProps {
  boardImage: IPostImage[];
}

const ImageLoader = ({ src, onLoad }: IImageLoaderProps) => {
    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const { currentTarget: { naturalWidth, naturalHeight } } = event;
        onLoad({ width: naturalWidth, height: naturalHeight });
    };

  return (
    <img
    src={src}
    style={{ display: 'none', maxWidth: '100%', maxHeight: '100%' }}
    onLoad={handleImageLoad}
    />
  );
};

const PostImage = ({ boardImage }: IPostImageProps) => {
    const [images, setImages] = useState(
            boardImage.map((img) => ({
            url: img.imagePath,
            imageName: img.imageName,
            width: null,
            height: null,
        }))
    );
    
    const containerWidth = 900; //가로 길이 제한
    const containerHeight = 700; //세로 길이 제한

    //가로/세로 제한 하나라도 넘으면 작은쪽 길이로 제한하고 비율맞춰 리사이징(width, heigth 값 명시 목적)
    const handleImageLoad = (index, size) => {
        let adjustedWidth = size.width;
        let adjustedHeight = size.height;

        if (size.width > containerWidth || size.height > containerHeight) {
            let ratio = size.width / size.height;
            if (size.width > size.height) {
                if (size.height > containerHeight) {
                    let gap = size.height - containerHeight;
                    adjustedHeight = adjustedHeight - gap;
                    adjustedWidth = adjustedHeight * ratio;
                } else {
                    adjustedWidth = containerWidth;
                    adjustedHeight = containerWidth / ratio;
                }
            } else {
                adjustedWidth = containerHeight * ratio;
                adjustedHeight = containerHeight;
            }

            setImages((prevImages) =>
                prevImages.map((img, i) =>
                    i === index
                        ? { ...img, width: adjustedWidth, height: adjustedHeight }
                        : img
                )
            );
        };
    }

    return (
        <>
            <div className={`${styles.imgWrapper}`}>   
            {images.map((image, index) => (
                <>
                    {image.width && image.height && (
                        <Image
                            key={index}
                            src={image.url}
                            alt={image.imageName}
                            width={image.width}
                            height={image.height}
                            className={`${styles['img' + boardImage.length]}`}   
                        />
                    )}
                    <ImageLoader src={image.url} onLoad={(size) => handleImageLoad(index, size)} />
                </>
            ))}
            </div>
        </>              
    );
};

export default PostImage;   
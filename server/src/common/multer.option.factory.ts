import { S3Client } from '@aws-sdk/client-s3';
import { Logger } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { v4 as uuid } from 'uuid';

export const multerOptionsFactory = async (): Promise<MulterOptions> => {
  // s3 인스턴스를 생성합니다.
  const s3 = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const multerS3 = await import('multer-s3');
  const path = await import('path');
  return {
    storage: multerS3({
      s3,
      bucket: 'ptop-image',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key(_req, file, done) {
        const ext = path.extname(file.originalname); // 파일의 확장자 추출
        // 파일 이름이 중복되는 것을 방지하기 위해 파일이름_날짜.확장자 형식으로 설정합니다.
        done(null, `${uuid()}${ext}`);
      },
    }),
  };
};

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { v4 as uuid } from 'uuid';

export const multerOptionsFactory = async (): Promise<MulterOptions> => {
  // s3 인스턴스를 생성합니다.
  const AWS = await import('aws-sdk');
  AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3();

  const multerS3 = await import('multer-s3-transform');
  const sharp: any = await import('sharp');
  const path = await import('path');

  const resultStorage = {
    storage: multerS3({
      s3,
      bucket: 'ptop-image',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      shouldTransform: function (_req, file, cb) {
        // 여기에서 이미지 파일만 리사이즈 대상으로 설정
        cb(null, /^image/.test(file.mimetype));
      },
      transforms: [
        {
          id: 'resized',
          key: function (_req, file, cb) {
            const ext = path.extname(file.originalname); // 파일의 확장자 추출
            // 파일 이름이 중복되는 것을 방지하기 위해 파일이름_날짜.확장자 형식으로 설정합니다.
            cb(null, `${uuid()}${ext}`);
          },
          transform: function (_req, file, cb) {
            // sharp를 사용하여 리사이즈를 실행하고 결과물을 전달합니다.
            cb(null, sharp().resize({ width: 900 }).jpeg({ quality: 80 }));
          },
        },
      ],
    }),
  };
  return resultStorage;
};

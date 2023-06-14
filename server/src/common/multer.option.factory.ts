import { Logger } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { v4 as uuid } from 'uuid';

const mkdir = async (directory: string) => {
  const fs = await import('fs');
  const path = await import('path');
  const logger = new Logger('Mkdir');
  try {
    fs.readdirSync(path.join(process.cwd(), directory));
  } catch (err) {
    console.log(path);
    logger.log(
      `지정한 경로에 ${directory}가 존재하지 않아 ${directory}를 생성합니다.`,
    );
    fs.mkdirSync(path.join(process.cwd(), directory));
  }
};

mkdir('uploads');

export const multerOptionsFactory = async (): Promise<MulterOptions> => {
  const multer = await import('multer');
  const path = await import('path');
  return {
    storage: multer.diskStorage({
      destination(req, file, done) {
        // 파일을 저장할 위치를 설정합니다
        done(null, path.join(process.cwd(), 'uploads'));
      },

      filename(req, file, done) {
        // 파일의 이름을 설정합니다.
        const ext = path.extname(file.originalname); // 파일 확장자 추출
        // const basename = path.basename(file.originalname, ext); // 파일 이름
        done(null, `${uuid()}${ext}`);
      },
    }),
  };
};

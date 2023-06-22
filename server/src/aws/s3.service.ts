export async function delete_image(image_name) {
  const AWS = await import('aws-sdk');
  AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3();

  const params = {
    Bucket: 'ptop-image',
    Key: image_name,
  };

  try {
    s3.deleteObject(params, function (error, data) {
      if (error) {
        console.log('err: ', error, error.stack);
      } else {
        console.log(data, ' 정상 삭제 되었습니다.');
      }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

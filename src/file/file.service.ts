import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  async uploadFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();

    const uploadResult = await s3
      .upload({
        ACL: 'public-read',
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
    return {
      url: uploadResult.Location,
      key: uploadResult.Key,
    };
  }

  async deleteUploadedFile(key: string) {
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
      .promise();
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    const s3 = new S3();

    const responses = await Promise.all(
      files.map(async (file) => {
        const uploadedFile = await s3
          .upload({
            ACL: 'public-read',
            Bucket: process.env.AWS_BUCKET_NAME,
            Body: file.buffer,
            Key: `${uuid()}-${file.originalname}`,
          })
          .promise();
        return uploadedFile;
      }),
    );
    return responses;
  }
}

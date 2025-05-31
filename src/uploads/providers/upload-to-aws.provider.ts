import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid4 } from 'uuid';
import * as path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UploadToAwsProvider {
  private readonly s3: S3Client;

  constructor(
    /**
     * Inject configService
     */
    private readonly configService: ConfigService,
  ) {
    // In your provider/service
    this.s3 = new S3Client({
      region: this.configService.get('appConfig.awsRegion'),
      credentials: {
        accessKeyId:
          this.configService.get<string>('appConfig.awsAccessKeyId') ?? '',
        secretAccessKey:
          this.configService.get<string>('appConfig.awsSecretAccessKey') ?? '',
      },
    });
  }

  public async fileUpload(file: Express.Multer.File) {
    try {
      const bucket = this.configService.get('appConfig.awsBucketName');
      if (!bucket) {
        throw new InternalServerErrorException(
          'AWS bucket name is not configured',
        );
      }

      const key = this.generateFileName(file);
      const uploadResult = await this.s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      console.log(uploadResult);

      return key;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // Extract file name
    let name = file.originalname.split('.')[0];
    // Remove white spaces
    name = name.replace(/\s/g, '').trim();
    // Extract the file extension
    const extension = path.extname(file.originalname);
    // Generate time stamp
    let timestamp = new Date().getTime().toString().trim();
    // Return file uuid
    return `${name}-${timestamp}-${uuid4()}${extension}`;
  }
}

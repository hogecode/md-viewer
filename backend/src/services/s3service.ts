import { injectable } from "inversify";
import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET_NAME = process.env.BUCKET_NAME!;

@injectable()
export class S3Service {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({ region: process.env.AWS_REGION });
  }
  
  /**
   * 署名付きURLを作成する関数
   */
  async generateSignedUrl(
    key: string,
    contentType: string = 'application/octet-stream',
    expiresIn = 3600
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(this.s3, command, { expiresIn });
    return url;
  }

  /**
   * S3キーからメタデータを取得する関数
   */
  async getObjectMetadata(key: string): Promise<Record<string, string>> {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const result = await this.s3.send(command);
    return result.Metadata ?? {};
  }
}

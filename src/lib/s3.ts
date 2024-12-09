import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (file: Buffer | Readable, key: string, contentType: string): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: file, // Pass Buffer or Readable stream here
    ContentType: contentType, // Set the MIME type
  });

  await s3.send(command);

  // Return the S3 or CloudFront URL
  return `https://${process.env.AWS_CLOUDFRONT_URL!}/${key}`;
};
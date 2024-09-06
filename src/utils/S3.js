import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFileToS3(file, fileName) {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
  };
  const command = new PutObjectCommand(uploadParams);
  const result = await client.send(command);
  if (result.$metadata.httpStatusCode !== 200)
    throw new Error('Error al subir el archivo a S3');
  console.log('Archivo subido a S3:', fileName);
  return fileName;
}

export async function getFileFromS3(fileName) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  });
  const response = await client.send(command);
  const stream = response.Body;

  return { stream, contentType: response.ContentType };
}

export async function deleteFileFromS3(fileName) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  });

  const result = await client.send(command);
  if (result.$metadata.httpStatusCode !== 204)
    throw new Error('Error al eliminar el archivo de S3');

  console.log('Archivo eliminado de S3:', fileName);
  return fileName;
}

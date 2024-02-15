import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {v4 as uuid} from "uuid";


const s3client = new S3Client()
const BUCKET = process.env.AWS_BUCKET_NAME

export const uploadToS3 = async ({file, userId}) => {
    const key=`${userId}/${uuid()}-${file.originalname}`;
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimeType
    })

    try{
        await s3client.send(command);
        return key
    }catch (error){
        console.log(error)
        return {error}
    }
};
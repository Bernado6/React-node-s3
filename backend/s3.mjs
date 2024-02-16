import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

const getImageKeysByUser = async (userId) => {
    const command = new ListObjectsV2Command(
      {
        Bucket: BUCKET,
        Prefix: userId,
    });
    
    const {Contents = []} = await s3client.send(command); 

    return Contents.map((image) => image.Key) 
};

export const getUserPresignedUrls = async (userId) => {
    try{
        const  imageKeys = await getImageKeysByUser(userId)

        const presignedUrls = await Promise.all(
            imageKeys.map((key) =>{
                const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
                return getSignedUrl(s3client, command, {expiresIn:900})

        }));

        return { presignedUrls}
        
    }catch (error){
        console.log(error)
        return  {error}
    }
}

import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "sa-east-1",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    }
  }
};

const sendFile = async(file, folder, fileName) => {

  try{

    await s3.putObject({
      Body: file,
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME + "/" + folder,
      Key: fileName
    }).promise();

    return "ok";

  } catch (err){
    return err;
  }
}

const awsService = {
  sendFile,
};

export default awsService;
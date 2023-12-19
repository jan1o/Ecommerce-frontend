
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

const sendFile = async(file, folder) => {
  try{

    const randomName = Date.now() + file.name;

    const fileParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME + "/" + folder + "/",
      Key: randomName,
      Expires: 600,
      ContentType: file.type,
      ACL: "public-read",
    };

    let url = null;
    await s3.getSignedUrlPromise("putObject", fileParams).then((res) => url = res.data);
    console.log("URL de upload: " + url);

    const res = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        'Content-Type': file.type,
        'Access-Control-Allow-Origin': '*'
      },
    }).then((res) => console.log("Resultado do envio: " + res.data));

    
    return "https://mycommercetutorial.s3.sa-east-1.amazonaws.com" + "/" + folder + "/" + randomName;

  } catch (err){
    return err;
  }
}

const awsService = {
  sendFile,
};

export default awsService;
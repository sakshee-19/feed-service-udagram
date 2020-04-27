import * as AWS from "aws-sdk";
import { config } from "./config/config";

const c = config.dev;

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

// var myConfig = new AWS.Config({
//     credentials: credentials,
//     region: c.aws_region
// });

var s3bucket = new AWS.S3({
    signatureVersion: 'v4',
  region: c.aws_region,
  params:{
      Bucket: c.aws_media_bucket}

});

// s3bucket.getSignedUrl()
export function getGetSignedUrl(key: string):string {
    const signedUrlExpireSeconds = 60 * 5
    const url = s3bucket.getSignedUrl('getObject', {
        Bucket: c.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
    });
    return url;
}

export function getPutSignedUrl(key: string) {
    const signedUrlExpireSeconds = 60 * 5
    const url = s3bucket.getSignedUrl('putObject', {
        Bucket: c.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
    })
    return url;
}
import * as AWS from "aws-sdk";
import { config } from "./config/config";

const c = config.dev;

var credentials = new AWS.SharedIniFileCredentials({profile: c.aws_profile});

var myConfig = new AWS.Config({
    credentials: credentials,
    region: c.aws_region
});

var s3bucket = new AWS.S3({params: {Bucket: c.aws_media_bucket}});

// s3bucket.getSignedUrl()
export function getGetSignedUrl(key: string) {
    return s3bucket.getSignedUrl('getObject', {
        Bucket: s3bucket,
        Key: key,
        Expires: 60*5
    })
}

export function getPutSignedUrl(key: string) {
    return s3bucket.getSignedUrl('putObject', {
        Bucket: s3bucket,
        Key: key,
        Expires: 60*5
    })
}
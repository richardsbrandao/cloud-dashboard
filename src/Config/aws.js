import AWS from 'aws-sdk';
import awsConfig from 'aws-config';
import { credentials } from './index';

AWS.config = awsConfig({
        accessKeyId: credentials.awsAccessKeyId, 
        secretAccessKey: credentials.awsSecretAccessKey,
        region: credentials.awsRegion
});

const ec2 = new AWS.EC2();
const rds = new AWS.RDS();
const s3 = new AWS.S3();
const elastiCache = new AWS.ElastiCache();

export { ec2, s3, rds, elastiCache };
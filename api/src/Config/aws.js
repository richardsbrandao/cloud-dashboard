import AWS from 'aws-sdk';
import awsConfig from 'aws-config';
import config from './config';

AWS.config = awsConfig({
        accessKeyId: config.aws.awsAccessKeyId, 
        secretAccessKey: config.aws.awsSecretAccessKey,
        region: config.aws.awsRegion
});

const ec2 = new AWS.EC2();
const rds = new AWS.RDS();
const elastiCache = new AWS.ElastiCache();

export { ec2, rds, elastiCache };
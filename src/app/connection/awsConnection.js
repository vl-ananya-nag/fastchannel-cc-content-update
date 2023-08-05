const { SharedIniFileCredentials, DynamoDB } = require('aws-sdk');
const { AWS_REGION, PROFILE } = process.env;

const params = { region: AWS_REGION };

if (PROFILE) {
    const credentials = new SharedIniFileCredentials({ profile: PROFILE });
    params.credentials = credentials;
}

const dynamoClient = () => {
    const docClient = new DynamoDB.DocumentClient(params);
    return docClient;
};

const s3Client = () => {
    const s3Client = new AWS.S3(params)
    return s3Client
}

module.exports = {
    dynamoClient, s3Client
}
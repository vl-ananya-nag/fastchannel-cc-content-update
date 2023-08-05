const { CONTENT_METADATA_TABLE } = process.env;
const { dynamoClient } = require('../connection/awsConnection');

const updateVideoContent = async (guid, videoAssets) => {
    const params = {
        TableName: CONTENT_METADATA_TABLE,
        Key: {
            id: guid,
            site: 'myoutdoortv'
        },
        UpdateExpression: `set videoAssets = :videoAssets`,
        ExpressionAttributeValues: {
            ':videoAssets': videoAssets,
        },
        ReturnValues: "UPDATED_NEW"
    };
    return await dynamoClient().update(params).promise();;
}

module.exports = {
    updateVideoContent
}
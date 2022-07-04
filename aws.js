const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });
export const client = new AWS.DynamoDB.DocumentClient();

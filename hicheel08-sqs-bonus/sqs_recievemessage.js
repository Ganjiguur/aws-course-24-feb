// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
    QueueUrl: 'https://sqs.ap-southeast-1.amazonaws.com/830800554161/my-test-queue', /* required */
    VisibilityTimeout: 600 // 10 min wait time for anyone else to process.
};


  sqs.receiveMessage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
var AWS = require('aws-sdk');
var sqs = new AWS.SQS({
    region: 'us-east-1'
});

exports.handler = function(event, context, callback) {
        console.log(JSON.stringify(event));
    
    var params = {
        MessageBody: JSON.stringify(event),
        QueueUrl: process.env.QUEUE_URL // Энэ хэсгийг ENV Variable дээрээ сольж тавина.
    };
    sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log('error:', "Fail Send Message" + err);
            context.done('error', "ERROR Put SQS"); // ERROR with message
            callback(null, 'ERROR Put SQS');
        } else {
            console.log('data:', data.MessageId);
            context.done(null, ''); // SUCCESS
            callback(null, '');
        }
    });
    
    console.log("Email sent");
        
        const requestParams = {
           Message: "Hey contact irsen bn",
           TopicArn: "arn:aws:sns:us-west-2:579631035085:aws-course",
          };

        
        var messageAcknowledge = sns.publish(requestParams).promise();
          
        console.log("Notifaction sent");
}
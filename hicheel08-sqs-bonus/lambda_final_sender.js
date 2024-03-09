const aws = require('aws-sdk');
const ses = new aws.SES();

exports.handler = (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2)); // logging
  for (const { messageId, body } of event.Records) // SQS loop
  {
      var messageBody = JSON.parse(body);
      var params = {}
      var templateData = {};

      params.Template = "my-template"; // replace template name
      templateData.subject = messageBody.subject; // ene Subject deer bichigdene
      templateData.message = messageBody.message;
      templateData.senderName = messageBody.senderName;
      params.TemplateData = JSON.stringify(templateData);
      params.Source = messageBody.senderEmail;
      var destination = {
        "ToAddresses": ["jiguur@fibo.edu.mn"] // end bol uuriin huleej avah email baina, List baij bolno shuu
      };
      params.Destination = destination;
      
      console.log(params);
      // Create the promise and SES service object
      var sendPromise = new aws.SES({ apiVersion: '2010-12-01' }).sendTemplatedEmail(params).promise();

      // Handle promise's fulfilled/rejected states
      sendPromise.then(
        function (data) {
          console.log('successful: ', data);
        }).catch(
          function (err) {
            console.error('error', err, err.stack);
          });
      console.log('SQS message %s: %j', messageId, body);
    }
    return `Successfully processed ${event.Records.length} messages.`;
};
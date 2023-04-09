import { Consumer } from 'sqs-consumer';
import { SQSClient, DeleteMessageCommand, Message } from '@aws-sdk/client-sqs';

const queueUrl =
  'https://sqs.us-east-1.amazonaws.com/779377485039/MyFirstQueue';
const region = 'us-east-1';

export const isRunning = () => {
  return true;
};

if (isRunning()) {
  console.log('Worker is running!');
}

const tryParseJson = (jsonString: string | undefined) => {
  if (jsonString === undefined) {
    return undefined;
  }
  try {
    return JSON.parse(jsonString);
  } catch {
    return undefined;
  }
};

const sqs = new SQSClient({ region });

const tryDeleteMessage = async (message: Message) => {
  try {
    const deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: message.ReceiptHandle
    };
    await sqs.send(new DeleteMessageCommand(deleteParams));
    console.log(`Message ${message.MessageId} deleted.`);
  } catch (error) {
    console.error(`Error deleting message ${message.MessageId}.`, error);
  }
};

const app = Consumer.create({
  queueUrl,
  region: 'us-east-1',
  handleMessage: async (message) => {
    const messageBody = tryParseJson(message.Body);
    if (messageBody != undefined) {
      console.log('name', messageBody.name);
      console.log('title', messageBody.title);
      console.log('----');
    }
    await tryDeleteMessage(message);
  }
});

app.on('error', (err) => {
  console.error('Unexpected error:', err.message);
  console.log('Closing service.');
  process.exit();
});

app.on('processing_error', (err) => {
  console.error('Processing error:', err.message);
});

app.start();

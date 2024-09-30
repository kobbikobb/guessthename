import { Consumer } from 'sqs-consumer';
import { tryParseJson } from './messageHelper';

const queueUrl =
    'https://sqs.us-east-1.amazonaws.com/779377485039/my-worker-queue';
const region = 'us-east-1';

const app = Consumer.create({
    queueUrl,
    region,
    handleMessage: async (message) => {
        const action = tryParseJson(message.Body);
        if (action != undefined) {
            console.log(`Received an action ${action.name}`);
        }

        console.log(`Message handled: ${message.Body}`);
    }
});

app.on('error', (err) => {
    console.error(`Unhanlded exception: ${err.message}`);
    process.exit();
});

app.on('processing_error', (err) => {
    console.error(`Processing error: ${err.message}`);
});

console.log('Worker is starting!');
app.start();

const amqp = require("amqplib");

async function sendMessage(message) {
    const url = 'amqp://rabmq:5672';
    const connection = await amqp.connect(url);
    const exchange = 'topic_exchange';
    const type = 'topic';
    const key = 'compse140.o';
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, type, {});
    channel.publish(exchange, key, Buffer.from(JSON.stringify(message)), {});
}

function queueMessage(index) {
    setTimeout(function() {
        sendMessage('MSG_' + index.toString());
    }, index * 3000);
}

setTimeout(function() {
    queueMessage(1);
    queueMessage(2);
    queueMessage(3);
}, 7000);

const amqp = require("amqplib");

var state = 'INIT';
var index = 1;

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

async function receiveState() {
    const url = 'amqp://rabmq:5672';
    const connection = await amqp.connect(url);
    const exchange = 'topic_exchange';
    const type = 'topic';
    const key = 'state.s';
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, type, {});
    const { queue } = await channel.assertQueue('', {});
    channel.bindQueue(queue, exchange, key);
    channel.consume(queue, (data) => {
        state = data.content.toString().replace(/['"]+/g, '');
        console.log('Changed state to ' + state)
        channel.ack(data, false, true);
    });
}

setInterval(function() {
    console.log('Looping... ' + state);
    if (state == 'INIT') {
        index = 1;
        state = 'RUNNING';
    }
    if (state == 'RUNNING') {
        sendMessage('MSG_' + index.toString());
        index++;
    }
}, 3000);

receiveState();

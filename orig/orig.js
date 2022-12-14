const amqp = require("amqplib");

var state = 'ERROR';
var index = 1;

async function sendMessage(message) {
    const connection = await amqp.connect(process.env.RABBITURL);
    const exchange = 'topic_exchange';
    const type = 'topic';
    const key = 'compse140.o';
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, type, {});
    channel.publish(exchange, key, Buffer.from(JSON.stringify(message)), {});
}

async function changeState(newState) {
    state = newState;
    const connection = await amqp.connect(process.env.RABBITURL);
    const exchange = 'topic_exchange';
    const type = 'topic';
    const key = 'state.b';
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, type, {});
    channel.publish(exchange, key, Buffer.from(JSON.stringify(newState)), {});
}

async function receiveState() {
    const connection = await amqp.connect(process.env.RABBITURL);
    const exchange = 'topic_exchange';
    const type = 'topic';
    const key = 'state.s';
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, type, {});
    const { queue } = await channel.assertQueue('', {});
    channel.bindQueue(queue, exchange, key);
    channel.consume(queue, (data) => {
        state = data.content.toString().replace(/['"]+/g, '');
        changeState(state);
        console.log('Changed state to ' + state);
        channel.ack(data, false, true);
    });
}

setInterval(function() {
    if (state === 'INIT') {
        index = 1;
        changeState('RUNNING');
    }
    if (state === 'RUNNING') {
        sendMessage('MSG_' + index.toString());
        index++;
    }
}, 3000);

receiveState();
changeState('INIT');

'use strict';

const amqp = require("amqplib");

async function sendMessage(message) {
    const connection = await amqp.connect(process.env.RABBITURL);
    const exchange = 'topic_exchange';
    const type = 'topic';
    const key = 'compse140.i';
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, type, {});
    channel.publish(exchange, key, Buffer.from(JSON.stringify(message)), {});
}

async function receiveMessages() {
    const connection = await amqp.connect(process.env.RABBITURL);
    const exchange = 'topic_exchange';
    const type = 'topic';
    const key = 'compse140.o';
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, type, {});
    const { queue } = await channel.assertQueue('', {});
    channel.bindQueue(queue, exchange, key);
    channel.consume(queue, (data) => {
        let response = 'Got ' + JSON.parse(data.content.toString());
        setTimeout(function() {
            sendMessage(response);
        }, 1000);
        channel.ack(data, false, true);
    });
}

receiveMessages();

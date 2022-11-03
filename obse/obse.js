'use strict';

var amqp = require('amqplib');
const fs = require('fs');

var index = 1;

function resetLog() {
    fs.writeFileSync('./logs/log.txt', '');
}

function writeLog(message, topic) {
    let date = new Date().toISOString();
    let data = date + ' ' + index.toString() + ' ' + message + ' to ' + topic + '\n';
    fs.appendFileSync('./logs/log.txt', data);
    index++;
}

async function observeMessages() {
    const url = 'amqp://rabmq:5672';
    const connection = await amqp.connect(url);
    const exchange = 'topic_exchange';
    const type = 'topic';
    const key = 'compse140.*';
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, type, {});
    const { queue } = await channel.assertQueue('', {});
    channel.bindQueue(queue, exchange, key);
    channel.consume(queue, (data) => {
        let messageLog = JSON.parse(data.content.toString());
        writeLog(messageLog, data.fields.routingKey);
        channel.ack(data, false, true);
    });
}

resetLog();
observeMessages();

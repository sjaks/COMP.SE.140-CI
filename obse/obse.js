'use strict';

var amqp = require('amqplib');
const fs = require('fs');

var index = 1;

function resetLogs() {
    fs.writeFileSync('./logs/log.txt', '');
    fs.writeFileSync('./logs/state-curr.txt', '');
    fs.writeFileSync('./logs/state-log.txt', '');
}

function writeLog(message, topic) {
    let date = new Date().toISOString();
    let data = date + ' ' + index.toString() + ' ' + message + ' to ' + topic + '\n';
    fs.appendFileSync('./logs/log.txt', data);
    index++;
}

function writeCurrState(state) {
    fs.writeFileSync('./logs/state-curr.txt', state);
}

function writeStateLog(state) {
    let date = new Date().toISOString();
    let data = date + ': ' + state + '\n';
    fs.appendFileSync('./logs/state-log.txt', data);
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

async function observeStateChanges() {
    const url = 'amqp://rabmq:5672';
    const connection = await amqp.connect(url);
    const exchange = 'topic_exchange';
    const type = 'topic';
    const key = 'state.b';
    let channel = await connection.createChannel();
    await channel.assertExchange(exchange, type, {});
    const { queue } = await channel.assertQueue('', {});
    channel.bindQueue(queue, exchange, key);
    channel.consume(queue, (data) => {
        let stateLog = JSON.parse(data.content.toString());
        writeStateLog(stateLog);
        writeCurrState(stateLog);
        channel.ack(data, false, true);
    });
}

resetLogs();
observeMessages();
observeStateChanges();

#!/usr/bin/env node

const amqp = require('amqplib')
const queue = 'task-queue'

async function run () {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  channel.assertQueue(queue, { durable: true })
  channel.prefetch(1)

  console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue)

  channel.consume(queue, function (msg) {
    const secs = msg.content.toString().split('.').length - 1

    console.log(' [x] Received %s', msg.content.toString())
    setTimeout(function () {
      console.log(' [x] Done')
      channel.ack(msg)
    }, secs * 1000)
  }, {
    noAck: false
  })
}

run()

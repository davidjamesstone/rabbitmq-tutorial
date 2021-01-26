#!/usr/bin/env node

const amqp = require('amqplib')
const queue = 'task-queue'

async function run () {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  const msg = process.argv.slice(2).join(' ') || 'Hello World'

  channel.assertQueue(queue, { durable: true })
  channel.sendToQueue(queue, Buffer.from(msg), { persistent: true })

  console.log(' [x] Sent %s', msg)

  setTimeout(function () {
    connection.close()
    process.exit(0)
  }, 500)
}

run()

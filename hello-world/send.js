#!/usr/bin/env node

const amqp = require('amqplib')

async function run () {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  const queue = 'hello'
  const msg = 'Hello World!'

  await channel.assertQueue(queue, { durable: false })
  await channel.sendToQueue(queue, Buffer.from(msg))

  console.log(' [x] Sent %s', msg)

  setTimeout(function () {
    connection.close()
    process.exit(0)
  }, 500)
}

run()

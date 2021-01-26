#!/usr/bin/env node

const amqp = require('amqplib')
const exchange = 'logs'

async function run () {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  const msg = process.argv.slice(2).join(' ') || 'Hello World!'
  await channel.assertExchange(exchange, 'fanout', { durable: false })
  channel.publish(exchange, '', Buffer.from(msg))

  console.log(' [x] Sent %s', msg)

  setTimeout(() => {
    connection.close()
    process.exit(0)
  }, 500)
}

run()

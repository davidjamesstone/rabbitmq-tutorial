#!/usr/bin/env node

const amqp = require('amqplib/callback_api')
const exchange = 'topic-logs'

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1
    }

    const args = process.argv.slice(2)
    const msg = args.slice(1).join(' ') || 'Hello World!'
    const key = (args.length > 0) ? args[0] : 'anonymous.info'

    channel.assertExchange(exchange, 'topic', { durable: false })
    channel.publish(exchange, key, Buffer.from(msg))

    console.log(' [x] Sent %s: %s', key, msg)
  })
  setTimeout(() => {
    connection.close()
    process.exit(0)
  }, 500)
})

#!/usr/bin/env node

const amqp = require('amqplib')
const exchange = 'logs'

async function run () {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  await channel.assertExchange(exchange, 'fanout', { durable: false })
  const q = await channel.assertQueue('', { exclusive: true })

  console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q.queue)

  await channel.bindQueue(q.queue, exchange, '')

  return channel.consume(q.queue, (msg) => {
    if (msg.content) {
      console.log(' [x] Received %s', msg.content.toString())
    }
  }, {
    noAck: true
  })
}

run()

// amqp.connect('amqp://localhost', (error0, connection) => {
//   if (error0) {
//     throw error0
//   }
//   connection.createChannel((error1, channel) => {
//     if (error1) {
//       throw error1
//     }

//     channel.assertExchange(exchange, 'fanout', { durable: false })
//     channel.assertQueue('', { exclusive: true }, (error2, q) => {
//       if (error2) {
//         throw error2
//       }

//       console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q.queue)

//       channel.bindQueue(q.queue, exchange, '')

//       channel.consume(q.queue, (msg) => {
//         if (msg.content) {
//           console.log(' [x] Received %s', msg.content.toString())
//         }
//       }, {
//         noAck: true
//       })
//     })
//   })
// })

# RabbitMQ Tutorial

## Start RabbitMQ

`docker run -d --hostname my-rabbit -p 5672:5672 -p 8080:15672 --name some-rabbit --rm rabbitmq:3-management`

## Management console

http://localhost:8080

## Tutorial

https://www.rabbitmq.com/getstarted.html

## Misc

`alias rabbitmqctl="docker exec some-rabbit rabbitmqctl"`

`rabbitmqctl --help`

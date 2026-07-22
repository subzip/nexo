import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({
  port: 8080,
})

wss.on('connection', (socket) => {
  console.log('Connected')

  socket.on('message', (data) => {
    console.log(data.toString())

    socket.send(data.toString())
  })

  socket.on('close', () => {
    console.log('Disconnected')
  })
})

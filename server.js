const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
server.listen(process.env.PORT || 3000)

const users = []

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', {user: users[socket.id], message:message})
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]

  })
})

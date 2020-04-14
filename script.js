const socket = io('http://localhost:3000')
const messageDis = document.getElementById('message-display')
const sendForm = document.getElementById('send-form')
const messageInput = document.getElementById('message-input')

const name = prompt("Enter a username/name")
appendMessage("You joined")
socket.emit('new-user', name)

socket.on('user-connected', name => {
  appendMessage(`${name} joined`)
})

socket.on('chat-message', data => {
  appendMessage(`${data.user}: ${data.message}`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} left`)
})

sendForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`*You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message){
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageDis.append(messageElement)
}

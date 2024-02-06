const express = require("express")
const app = express()

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)

const porta = 8000


app.use(express.static('public'))

http.listen(porta, () => {
    console.log("Servidor iniciado na porta " + porta)
})



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

serverSocket.on('connection', (socket) => {
    socket.on('login', (nickname) => {
        console.log(`Usuario ${nickname} conectou.`)
        serverSocket.emit('chat msg', `Usuario ${nickname} conectou.`)
        socket.nickname = nickname
    })

    socket.on('chat msg', (msg) => {
        console.log(`Msg recebida do cliente ${socket.nickname}: ${msg}`)
        serverSocket.emit('chat msg', `${socket.nickname} diz: ${msg}`)
    })

    socket.on('status', (status) => {
        socket.broadcast.emit('status', status)
    })

})




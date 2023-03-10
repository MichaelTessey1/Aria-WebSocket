const io = require('socket.io')(8000, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

io.on('connection', socket => {
    console.log(socket.id)
    socket.on("room-key", (roomKey) => {
        console.log("rk:", roomKey, "sid:", socket.id)
        //send to everyone connected to the server including yourself
        // io.emit('receive-roomKey', roomKey)
        //for everyone else
        // socket.broadcast.emit('receive-roomKey', roomKey)
        //to a specific room
        if(roomKey === "") {
            socket.broadcast.emit('receive-roomKey', roomKey)
            console.log('random non existent room key')
        }
        else {
            socket.to(roomKey).emit('receive-roomKey', roomKey)
            console.log('WORKING ROOM SOCKET')
        }
    }) 

    socket.on('join-room', (roomKey) => {
        socket.join(roomKey)
    })

    socket.on('send-message', (message, roomkey, name) => {
        console.log(message, roomkey, name)
    
        socket.to(roomkey).emit("recieve-message", message, name)
        
    })
    
    socket.on('send-yt-link', (yt_link, roomkey) => {
        console.log('incoming : ', yt_link, roomkey)
        socket.to(roomkey).emit("recieve-yt", yt_link)
        
    })

})
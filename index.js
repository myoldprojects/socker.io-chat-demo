const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const port = process.env.PORT || 3000;

app.use(express.static('pub'));

app.get('/', (req, res) =>{
    res.sendFile(__dirnam + '/index.html');
});

io.on('connection', (socket)=>{
    console.log('Client connected');
    //socket.broadcast.emit('Client connected');
    socket.broadcast.emit('chat message','Client connected');

    socket.on('chat message', (msg) => {
        console.log('Client message :' + msg )
        //broadcast to all clients
        io.emit('chat message', msg);
    })
    socket.on('disconnect', ()=>{
        console.log('Client disconnected');
    });
});

httpServer.listen(port, ()=>{
    console.log('Server listening to port: '+ port);
    console.log('http://localhost:'+ port); 
});
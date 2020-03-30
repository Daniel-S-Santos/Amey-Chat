var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//require('./GxPost')

const port = process.env.PORT || 3000

io.on('connection', function (socket) {
    console.log('connection.....')

    socket.on('disconnect', function(){
        console.log('desconectado')
    });
    
    socket.on('create', function (room,name) { 
        socket.leaveAll()       
        socket.join(room)  
            
        console.log(`${name}`,'entrou na',room)
        socket.in(room).emit('Entrou',room, name)        
    });  
    socket.on('mensagem', function (room,name,msg) {
        //console.log(`${nome}`,'mandou:', data); 
        //socket.to(room).emit('Fulano',`${room,nome,data}`)
        
        //console.log(room+ ' nome '+name+ ' '+msg)        
        io.in(room).emit('msgg',room ,name ,msg)        
        //io.emit('mensagem',room ,name ,msg )
        
        
        console.log('disse ',msg)
        //socket.emit('Me',data)
    }); 

});


server.listen(port, () => {
    console.log('server rodando na porta '+port)
});




//socket.on('chat message', (msg)=>{$('#messages').append($('<li>').text(msg));});
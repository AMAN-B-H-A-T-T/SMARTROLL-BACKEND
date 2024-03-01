
let io_obj
let socket_obj 

function initilizedSocket(io,sessionId){    
    io.of(`/lecture/${sessionId}`).on('connection',(socket)=>{
        console.log("connection established")
        socket_obj = socket
        //
        socket.on('message',(message)=>{
            console.log(JSON.parse(message).h1)
        })

        socket.on('serverMessage',(message)=>{
            console.log(message)
        })
        socket.on('disconnect',()=>{
            console.log("disconnected")
        })
    })   
}

function getSocketObject(){
    return socket_obj
}

function setSocketObject(io){
    io_obj = io
}
function getIoObject(){
    return io_obj
}

module.exports = {
    getSocketObject,
    initilizedSocket,
    setSocketObject,
    getIoObject
}
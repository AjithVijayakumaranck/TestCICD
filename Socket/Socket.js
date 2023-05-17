const io = require('socket.io')(8800, {

    path: "/socket/socket.io",
    cors: {
        origin: "https://gamegram.ga"
    }
}, () => {
    console.log("socket working");
})

let users = []

io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
})
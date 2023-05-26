

const io = require('socket.io')(8900, {
    path: "/socket/socket.io",
    cors: {
        origin: ["http://localhost:3000"],
        credentials:true
    }
}, () => {
    console.log("socket working");
})

//online users array
let users = []


//add new user to the online users array
const addUser = (userId, socketId) => {
    console.log(userId,"sdadas")
    console.log(users,"users arrau")
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

//disconnection function
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

//function for getting a specific user socket id
const getUser = (userId) => {
    console.log(userId,"sadasdsa");
    console.log(users);
    console.log(users.find((user) => user.userId === userId));
    return users.find((user) => user.userId === userId);
};


//function for getting all online users
const getAllUsers = (userId) => {
    console.log(userId, "hello users");
    return users
};


//socket io connection establishing
io.on("connection", (socket) => {

    //when connect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId.userId, socket.id);
        io.emit("getUsers", users);
    });


    //capturing message senting event   
    socket.on("sendMessage", ({ userId, receiverId, text }) => {
        const user = getUser(receiverId)
        console.log("asdads",user,"reciver websoicket");
        io.to(user?.socketId).emit('getMessage', {
            userId, text
        })
    })

    //get all the online users
    socket.on("getAllUsers", async (userId) => {
        const allUsers = await getAllUsers(userId)
        io.emit('getusersAll', {
            allUsers
        })
    })

    //disconnection event
    socket.on("disconnect", async () => {
        removeUser(socket.id)
        io.emit('getusersAll', {
            users
        })
    })


})
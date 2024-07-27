

const io = require('socket.io')(8900, {
    path: "/socket/socket.io",
    cors: {
        origin: ["https://www.dealnbuy.in","http://www.dnbtest.in","http://dealnbuy.in",, "https://dealnbuy.in", "http://localhost:3000","http://195.35.22.187","https://test-repo-orpin-zeta.vercel.app"],
        credentials:true
    }
}, () => console.log("socket working"))

//online users array
let users = []


//add new user to the online users array
const addUser = (userId, socketId) => {
    console.log(userId,socketId,"sdasd");
    if(userId){
        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId });
            console.log(users,"looo");
    }else{
        return;
    }
};

//disconnection function
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

//function for getting a specific user socket id
const getUser =(userId) => {
    return users.find((user) => user.userId === userId);   
};



//function for getting all online users
const getAllUsers = (userId) => {
    return users
};


//socket io connection establishing
io.on("connection", (socket) => {

    //when connect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      
        addUser(userId.userId, socket.id);
        console.log(users,"hello");
        io.emit("getUsers", users);
    });


    //capturing message senting event   
    socket.on("sendMessage",async ({ userId, receiverId, text ,offerMade = false}) => {
        console.log( userId, receiverId, text ,offerMade);
        const user =await getUser(receiverId)
        console.log(user,"reciever found");
        io.to(user?.socketId).emit('getMessage', {
            userId, text , offerMade
        })
        console.log("after");
    })

    //sent notification alert
    socket.on("sentAlert",({receiverId})=> {
    console.log(receiverId,"alert seended");
        const user = getUser(receiverId)
        console.log(user,"reciever found");

        io.to(user?.socketId).emit('notificationAlert',{
            Alert:true
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
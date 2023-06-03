const express = require('express');
const app = express();
const env = require('dotenv')
const fs = require('fs')
env.config()
const session = require('express-session');
const passport = require('passport');
require('./Controllers/passport/passport')
const cors = require('cors');
const bodyParser= require('body-parser');




const connect = require('./Connections/db')

app.use(bodyParser.urlencoded({
    extended: true
  }));

//Routes
const userRoute = require('./Routes/userRoute');
const googleAuth = require('./Routes/authRoute')
const category = require('./Routes/categoryRoutes')
const wishlist = require('./Routes/wishlistRoutes')
const product = require('./Routes/productRoute')
const filter = require('./Routes/filterRoute')
const profile = require('./Routes/profileRoute')
const chat = require('./Routes/chatRoutes')
const notification = require('./Routes/notificationRoutes')

//Super Admin Routes
const superAdmin = require('./Routes/SuperAdmin/superAdminRoute')
const categoryRoute = require('./Routes/SuperAdmin/categoryControleRoute')
const userControllRoute = require('./Routes/SuperAdmin/usersRoute')
const productControllRoute = require('./Routes/SuperAdmin/productControleRoute')


if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

//static Flolder
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));


app.use(session({ secret: 'intutive', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


//cors
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

app.use(express.json())

//dbconnection
connect()

//mainRoutes
app.use('/api',userRoute)
app.use('/api/auth',googleAuth)
app.use('/api/category',category)
app.use('/api/user/wishlist',wishlist)
app.use('/api/user/product',product)
app.use('/api/user/filter',filter)
app.use('/api/user/profile',profile)
app.use('/api/user/chat',chat)
app.use('/api/user/notification',notification)

//Super Admin Routes
app.use('/api/super_admin',superAdmin)
app.use('/api/super_admin/category',categoryRoute)
app.use('/api/super_admin/user_control',userControllRoute)
app.use('/api/super_admin/product_control',productControllRoute)

//server port
app.listen(8080,()=>{
    console.log('server connected at port 8080');
})
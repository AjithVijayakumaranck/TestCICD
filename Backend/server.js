const express = require('express');
const app = express();
const env = require('dotenv')
env.config()
const session = require('express-session');
const passport = require('passport');
require('./Controllers/passport/passport')
const cors = require('cors');


const connect = require('./Connections/db')


//Routes
const userRoute = require('./Routes/userRoute');
const googleAuth = require('./Routes/authRoute')


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
app.use('/auth',googleAuth)

//server port
app.listen(8080,()=>{
    console.log('server connected at port 8080');
})
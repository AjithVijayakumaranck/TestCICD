const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv')
env.config()


const connect = require('./Connections/db')
const userRoute = require('./Routes/userRoute')



//cors
app.use(cors())
app.use(express.json())

//dbconnection
connect()

//mainRoutes
app.use('/api',userRoute)

//server port
app.listen(8080,()=>{
    console.log('server connected at port 8080');
})
const express = require('express');
const app = express();
const env = require('dotenv')
const fs = require('fs')
env.config()
const session = require('express-session');
const passport = require('passport');
require('./Controllers/passport/passport')
const cors = require('cors');
const bodyParser = require('body-parser');




//Routes
const userRoute = require('./Routes/userRoute');
const googleAuth = require('./Routes/authRoute')
const category = require('./Routes/categoryRoutes')
const wishlist = require('./Routes/wishlistRoutes')
const product = require('./Routes/productRoute')
const adv = require('./Routes/advertisementRoutes')
const filter = require('./Routes/filterRoute')
const profile = require('./Routes/profileRoute')
const chat = require('./Routes/chatRoutes')
const notification = require('./Routes/notificationRoutes')
const subscription = require('./Routes/subscriptionRotue')
const checkout = require('./Routes/checkoutRoutes')
const feedback = require('./Routes/feedbackRoute')
const carousal = require('./Routes/carousalRoute')

//Super Admin Routes
const superAdmin = require('./Routes/SuperAdmin/superAdminRoute')
const categoryRoute = require('./Routes/SuperAdmin/categoryControleRoute')
const userControllRoute = require('./Routes/SuperAdmin/usersRoute')
const productControllRoute = require('./Routes/SuperAdmin/productControleRoute')
const subscriptionControlRoute = require('./Routes/SuperAdmin/subscribtionRoute')
const carousalRoute = require('./Routes/SuperAdmin/carousalRoute')
const feedbackRoute = require('./Routes/SuperAdmin/feedbackRoute')
const notificationRoute = require('./Routes/SuperAdmin/notificationRoute')
const termRoute = require('./Routes/SuperAdmin/termsConditions')


if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

//static Flolder
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));




//cors

const allowedOrigins = [
    "https://www.dealnbuy.in",
    "https://dealnbuy.in",
    "http://localhost:3000",
    "http://195.35.22.187",
    "https://test-repo-orpin-zeta.vercel.app",
    "https://dnb-test.vercel.app"


];

app.use(cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
}))

const connect = require('./Connections/db')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({ secret: 'intutive', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



app.use(express.json())

//dbconnection
connect()

//mainRoutes
app.use('/api', userRoute)
app.use('/api/auth', googleAuth)
app.use('/api/category', category)
app.use('/api/user/wishlist', wishlist)
app.use('/api/user/product', product)
app.use('/api/user/advertisement', adv)
app.use('/api/user/filter', filter)
app.use('/api/user/profile', profile)
app.use('/api/user/chat', chat)
app.use('/api/user/notification', notification)
app.use('/api/user/subscription_plans', subscription)
app.use('/api/user/check_out', checkout)
app.use('/api/user/feedback', feedback)
app.use('/api/user/slide', carousal)

//Super Admin Routes
app.use('/api/super_admin', superAdmin)
app.use('/api/super_admin/category', categoryRoute)
app.use('/api/super_admin/user_control', userControllRoute)
app.use('/api/super_admin/product_control', productControllRoute)
app.use('/api/super_admin/subscription_control', subscriptionControlRoute)
app.use('/api/super_admin/carousal_control', carousalRoute)
app.use('/api/super_admin/notification_control', notificationRoute)
app.use('/api/super_admin/feedback_control', feedbackRoute)
app.use('/api/super_admin/terms', termRoute)

//server port
app.listen(8080, () => {
    console.log('server connected at port 8080');
})
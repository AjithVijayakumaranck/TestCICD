const router = require('express').Router()
const passport = require('passport')

const auth_Controller= require('../Controllers/auth_controller')

const {CLIENT_URL} = process.env


//google auth

router.get('/',(req,res)=>{
    
})

router.get('/loginsuccess',(req,res)=>{
    console.log(req.user,"userrrr");
})

router.get('/loginfailed',auth_Controller.LoginFailed)

router.get('/google',passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

router.get('/google/callback',passport.authenticate('google', {failureRedirect: '/auth/loginfailed' , successRedirect:'/auth/loginsuccess'}));



module.exports = router
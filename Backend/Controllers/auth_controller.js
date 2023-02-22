const {CLIENT_URL,JWT_SECRET_KEY} = process.env

const jwt = require("jsonwebtoken")


module.exports = {

    //login Success
    LoginSuccess:async (req, res) => {
        try {
            console.log(req.user, "userrrr");
            const token =await jwt.sign(req.user.id,JWT_SECRET_KEY)
            res.status(200).json({token:token,user:req.user._json})
        } catch (error) {
            console.log(error,"hel;lopg");
            res.status(500).json({ messsage: "something went wrong" })
        }

    },

    //login failed
    LoginFailed: (req, res) => {
        try {
            res.status(400).json({
                status: false,
                messgae: "Authentication failed"
            })
        } catch (error) {
            console.log(error.message,"hello google");
            res.status(500).json({
                status: fasle,
                message: "something went wrong"
            })

        }
    }
}
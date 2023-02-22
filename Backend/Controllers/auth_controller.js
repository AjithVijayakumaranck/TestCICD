
module.exports = {

    LoginSuccess: (req, res) => {

    },
    LoginFailed: (req, res) => {
        res.status(400).json({
            status: false,
            messgae: "Authentication failed"
        })
    }
}
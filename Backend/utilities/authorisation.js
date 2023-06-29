const jwt  = require('jsonwebtoken')

//Authentication middeware session
const authorisationMiddleware = (req,res,next)=>{
    if(req.user){
        console.log("user autherised");
        next()
    }else{
        res.status(401).json({message:"you seems unauthorised"})
    }
}

//Authorisationsation Jwt
const authoriseJwt =async (req,res,next)=>{
    const token =await req.headers.authorization.split(' ')[1] 
    console.log(token)
    if (!token) {
        res.send("We need a token, please give it to us next time");
    } else {
        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ auth: false, message: "you are failed to authenticate" });
            } else {
                 console.log("successfully verifies");
                next();
            }
        });
    }
}
// const authoriseJwt =async (req,res,next)=>{
//     const token =await req.headers.authorization.split(' ')[1] 
//     if (!token) {
//         res.send("We need a token, please give it to us next time");
//     } else {
//         jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
//             if (err) {
//                 res.status(401).json({ auth: false, message: "you are failed to authenticate" });
//             } else {
//                  console.log("successfully verifies");
//                 req.userId = decoded.id;
//                 next();
//             }
//         });
//     }
// }


module.exports = {authorisationMiddleware,authoriseJwt}
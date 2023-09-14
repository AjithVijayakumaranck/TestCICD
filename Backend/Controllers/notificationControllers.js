const { NOTIFICATION } = require("../Models/notificationModel")

module.exports = {
    sentNotification : (req,res)=>{
        try {
            const {senderId="",recieverId="",broadcast=true,notification=""} = req.body
            const notificationTemplate = new NOTIFICATION({
                senderId:senderId,
                recieverId:recieverId,
                broadcast:broadcast,
                notification:notification
            })
            notificationTemplate.save().then((response)=>{
                res.status(200).json(response)
            }).catch((err)=>{
                res.status(400).json({message:err.message})
            })
        } catch (error) {
            res.status(500).json({message:"something went wrong"})
        }
    },
    getNotification :async (req,res)=>{
        try {
            const {userId} = req.query
            if(!userId){
                const notificationDetails = await NOTIFICATION.find({broadcast:true}).sort({createdAt:-1}).limit(10)
                if(notificationDetails){
                    res.status(200).json(notificationDetails)
                }else{
                    res.status(400).json({message:"notifications not found"})
                }
            }else{    
                const notificationDetails = await NOTIFICATION.find({$or : [{reciverId:userId},{broadcast:true}]}).sort({createdAt:-1}).limit(10)
                if(notificationDetails){
                    res.status(200).json(notificationDetails)
                }else{
                    res.status(400).json({message:"notifications not found"})
                }
            }
            
       
        } catch (error) {
            res.status(500).json({message:"something went wrong "})
        }
    },
    getNotificationCount: async (req,res)=>{
        try {
            const {userId} = req.params
            NOTIFICATION.find({$or : [{reciverId:userId},{broadcast:true}], read: { $nin: [userId ] }}).count().then((response)=>{
                res.status(200).json(response)
            }).catch((error)=>{
                res.status(400).json(error.message)
            })

        } catch (error) {
            res.status().json({message:error.message})
        }
    },

    MarkRead:(req,res)=>{
        try {
            const {notificationId,userId} = req.params
            NOTIFICATION.findById(notificationId).then(()=>{
                NOTIFICATION.updateOne({_id:notificationId},{
                    $push:{
                        read:userId
                    }
                }).then((response)=>{
                    res.status(200).json(response)
                }).catcj((error)=>{
                    res.status(400).json(error.message)
                })
            }).catch((error)=>{
                res.status(400).json(error.message)
            })
        } catch (error) {
            res.status(500).json(error.status)
        }
    }
}
const FEEDBACK = require("../Models/feedbackModel")

module.exports = {
    postFeedback :async (req,res)=>{
        try {
            console.log(req.body,"hellll");
            const {Email,Message,Name} = req.body
            const feedbackExist = await FEEDBACK.findOne({email:Email,read:false })
            if(feedbackExist){
                return res.status(400).json({messsage:"Feedback already exists"})
            }else{
                FEEDBACK.create({
                    email:Email,
                    message:Message,
                    sender:Name             
                }).then((response)=>{
                    res.status(200).json({messsage:"Feedback sent successfully"})
                }).catch((error)=>{
                    res.status(400).json({messsage:"Feedback not sent"})
                })
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({messsage:"An error occurred"})
        }
    },

    getFeedbacks:(req,res)=>{
        try {
            FEEDBACK.find({deleted:false,read:false}).then((response)=>{
                res.status(200).json(response)
            }).catch((error)=>{
                res.status(500).json({messsage:"An error occurred"})
            })
        } catch (error) {
            res.status(500).json({messsage:"An error occurred"})
        }
    },

    markRead :async (req,res)=>{
        try {
            const {feedbackId} = req.params
            const feedbackDetails  = await FEEDBACK.findById(feedbackId)
            if(!feedbackDetails){
                res.status(404).json({message:"Feedback not found"})
            }else{
                FEEDBACK.findByIdAndUpdate(feedbackId , {read:true}).then((response)=>{
                  res.status(200).json({message:"Feedback marked as read"})  
                }).catch((error)=>{
                    res.status(500).json({messsage:"Feedback is still marked as unread"})
                })
            }
        } catch (error) {
            res.status(500).json({messsage:"An error occurred"})
        }
    }
}
const { CONVERSATION } = require("../Models/conversationModel");
const { MESSAGE } = require("../Models/messageModel");

module.export = {

    //create a conversation between two specific users
    createConversation : async (req,res,next)=>{
        try{
            const {senderId,recieverId} = req.body
            let newConversation =await new CONVERSATION({
                member:[senderId,recieverId]
            })
            const savedConversation = await newConversation.save()
            res.status(200).json(savedConversation)
    
        }catch(err){
            res.status(500).json(err)
        }
    },
    

    //get conversations of a specific user
    getConversation: async (req,res,next)=>{
        try{
            const  {userId} = req.params
            const  conversation = await CONVERSATION.find({member:{
                $in:[userId]
            }})
            res.status(200).json(conversation)
    
        }catch(err){
            res.status(500).json(err)
        }
    },

   //add  a new record to chat collecton
    addMessage: async (req,res,next)=>{
        try{
            const {sender,text,conversationId} = req.body
            const newMessage =await new MESSAGE(
              {
               conversationId:conversationId,
               sender:sender,
               text:text
              }
            )
          const savedMessage = await newMessage.save()
          res.status(200).json(savedMessage)
        }catch(err){
            res.status(500).json(err)
        }
    },


    //get all the messasges of a specific converstion
    getMessage : async (req,res,next)=>{
        console.log(req.params.conversationId,"hello");
        try{
            const {conversationId} = req.params
            const  allMessagges = await MESSAGE.find({conversationId:conversationId})
            res.status(200).json({allMessagges})
        }catch(err){
            res.status(500).json(err)
        }
    }
}
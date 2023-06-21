const SUBSCRIPTION = require("../../Models/subcriptionModel");

module.exports = {

    //add new subscription

    addSubcription : async (req,res)=>{
        try {
            
            const {planName,planDuration,features,discount,planPricing} = req.body
            const existedPlan = await SUBSCRIPTION.findOne({plan_name:planName})

            if(!existedPlan){
                

                SUBSCRIPTION.create({
                    plan_name:planName,
                    plan_duration:planDuration,
                    Features:features,
                    monthly_pricing:monthlyPricing,
                    yearly_pricing:yearlyPricing,
                    discount:discount
                }).then((response)=>{
                    res.status(200).json({response,message:"plan is active"})
                }).catch((error)=>{
                    res.status(400).json({error,message:"plan is not added"})
                })


            }else{
                res.status(409).json({message:"plan already existed"})
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({message:"something went wrong"})
        }
    },

    //edit existing subscription record

    updateSubscription : async (req,res)=>{
        try {
            
            const {subscriptionId,planName,planDuration,features,planPricing} = req.body
            const subcriptionDetails = await SUBSCRIPTION.findByid(subscriptionId)

            if(!subcriptionDetails){
                SUBSCRIPTION.findbyidAndUpdate(subscriptionId,{
                    $set:{
                        plan_name:planName,
                        plan_duration:planDuration,
                        Features:features,
                        monthly_pricing:monthlyPricing,
                        yearly_pricing:yearlyPricing,
                        discount:discount
                    }
                }).then((response)=>{
                    res.status(200).json({response,message:"Plan resetted"})
                }).catch((error)=>{
                    res.status(400).json({error,message:"Plan not found"})
                })
            }else{
                res.status(404).json({message:"Plan not exist"})
            }

        } catch (error) {

            console.log(error,"some error have been occurred");
            res.status(500).json({message:"something went wrong"})

        }
    },

    // delete subscription Plan

    deleteSubscription : async (req,res)=>{
            try {
                const {subscriptionId} = req.params
                const subcriptionDetails = await SUBSCRIPTION.findByid(subscriptionId)
                if(!subcriptionDetails){
                    res.status(404).json({message:"Plan not exist"})
                }else{
                    SUBSCRIPTION.updateOne({_id:subscriptionId},{active_status:false}).then((response)=>{
                        res.status(200).json({response,message:"Plan deactivated"})
                    }).catch((err)=>{
                        res.status(400).json({error,message:"Plan not deactivated"})
                    })
                }
            }catch(error){
                res.status(500).json({message:"some error have been occurred"})
            }
        }

}
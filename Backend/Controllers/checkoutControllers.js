const Stripe = require('stripe')
const SUBSCRIPTION = require('../Models/subcriptionModel')
const USER = require('../Models/userModel')
const stripe = Stripe(process.env.STRIPE_KEY)


module.exports = {

    //stripe checkout
      sripeCheckout :async (req,res)=>{
             const {userId,subscriptionPlanId} = req.body
             console.log(req.body);
             const planDetails = await SUBSCRIPTION.findById(subscriptionPlanId)
             console.log(planDetails);
             const customData = await stripe.customers.create({
              metadata:{
                userId:userId,
                planId:subscriptionPlanId
              }
             })
             const session = await stripe.checkout.sessions.create({
              line_items: [
                {
                  price_data: {
                    currency: 'inr',
                    product_data: {
                      name: planDetails.plan_name,
                    },
                    unit_amount: Number(planDetails.monthly_pricing*100),
                  },
                  quantity: 1,
                },
              ],
              customer: customData.id,
              payment_method_types:["card"],
              mode: 'payment',
              success_url: 'http://localhost:3000',
              cancel_url: 'http://localhost:3000',
            }).then((response)=>{
              console.log(response,"helelelelelel");
              res.send({url:response.url});  
            }).catch((err)=>{
              console.log(err.message);
            })
    },


    //WEBHOOK STRIPE
    stripeWebhook :  (req,res) => {
      // const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET
     try {
        
      let endpointSecret;
      let data;
      let eventType;

      const sig = req.headers['stripe-signature'];

      if(endpointSecret){
        let event;
        try {
          event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            endpointSecret
            );
          console.log("webhook verified")
        } catch (err) {
          console.log(`Webhook Error: ${err.message}`)
          res.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }
        data = event.data.object;
        eventType = event.type;
      }else{
        data = req.body.data.object;
        eventType = req.body.type;

        // Handle the event
        if(eventType === "checkout.session.completed"){
          console.log("enterd cgeeeee");
          stripe.customers.retrieve(data.customer).then(async(response)=>{

               const {userId,planId} = response.metadata

               const userDetails =await USER.findOne({_id:userId})
               console.log(userDetails._id,"userId");
               if(!userDetails){
                res.status(404).json({message:"user not found"})
               }else{
                USER.updateOne({_id:userId},{
                  $set:{
                    'subscription.plan' :planId,
                    'subscription.subscribedAt' : Date.now(),
                    premiumuser:true
                  }
                }).then((response)=>{
                  console.log(response,"update status");
                  res.status(200).json({message:"success"}).end()
                }).catch((error)=>{
                  console.log(error);
                  res.status(500).json({message:error.message}).end()
                })
               }
          }).catch((err)=>{
            console.log(err.message,"stripe error");
          })
  
        }else{
          res.status(400).json({message:"Error occurred while updating"})
        }
      }
     } catch (error) {

      console.log(error.message);
      res.status(500).json({message:error.message})
      
     }

    
      // Return a 200 res to acknowledge receipt of the event
      // res.status(200).json({message:"verified"});
    }
}
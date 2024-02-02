const Stripe = require('stripe')
const SUBSCRIPTION = require('../Models/subcriptionModel')
const USER = require('../Models/userModel')
const Razorpay = require('razorpay');
const paypal = require('@paypal/checkout-server-sdk');
const stripe = Stripe(process.env.STRIPE_KEY)
const shortid = require('shortid');
const crypto = require('crypto')

const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET })


//PAYPAL config
const Environment =
  process.env.PAYPAL_ENVIRONMENT === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment

const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
)



module.exports = {

  createRazorpayOrder : async (req,res)=>{
    try {
      const { userId, subscriptionPlanId } = req.body
    const planDetails = await SUBSCRIPTION.findById(subscriptionPlanId)
    const orderCreated =await instance.orders.create({
      amount: Number(planDetails.monthly_pricing * 100),
      currency: "INR",
      receipt: shortid.generate(),
      notes:{
        reqUser : userId
      }
    })
    if(orderCreated){
      res.status(200).json({orderId:orderCreated.id,amount:orderCreated.amount,currency:orderCreated.currency})
    }else{
      res.status(500).json({message:"order not created"})
    }
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message)
    }
  },

  orderValidation : async (req,res)=>{
    try {
      console.log(req.body);
      const {razorpay_order_id,razorpay_payment_id,razorpay_signature,userId,planId} = req.body;
      const secret = process.env.RAZORPAY_SECRET
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      console.log('transaction is not valied');
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }else {
      console.log('transaction is valied');
      const userDetails = await USER.findOne({ _id: userId })
      if (!userDetails) {
        res.status(404).json({ message: "user not found" })
      } else {
        const planDetails = await SUBSCRIPTION.findById(planId)
        USER.updateOne({ _id: userId }, {
          $set: {
            'subscription.plan': planId,
            'subscription.subscribedAt': Date.now(),
            premiumuser: true,
            AdCount: +userDetails.AdCount + +planDetails.extra_ads,
            ImageCount: +userDetails.ImageCount + +planDetails.extra_images
          }
        }).then((response) => {
          res.status(200).json({ message: "success" }).end()
        }).catch((error) => {
          console.log(error);
          res.status(500).json({ message: error.message }).end()
        })
      }
    }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message)
    }
  },

  //stripe checkout
  sripeCheckout: async (req, res) => {
    const { userId, subscriptionPlanId } = req.body
    console.log(req.body);
    const planDetails = await SUBSCRIPTION.findById(subscriptionPlanId)
    console.log(planDetails);
    const customData = await stripe.customers.create({
      metadata: {
        userId: userId,
        planId: subscriptionPlanId
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
            unit_amount: Number(planDetails.monthly_pricing * 100),
          },
          quantity: 1,
        },
      ],
      customer: customData.id,
      payment_method_types: ["card"],
      mode: 'payment',
      success_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000',
    }).then((response) => {
      res.send({ url: response.url });
    }).catch((err) => {
      console.log(err.message);
    })
  },


  //WEBHOOK STRIPE
  stripeWebhook: (req, res) => {
    // const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET
    try {

      let endpointSecret;
      let data;
      let eventType;

      const sig = req.headers['stripe-signature'];

      if (endpointSecret) {
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
      } else {
        data = req.body.data.object;
        eventType = req.body.type;

        // Handle the event
        if (eventType === "checkout.session.completed") {
          console.log("enterd cgeeeee");
          stripe.customers.retrieve(data.customer).then(async (response) => {

            const { userId, planId } = response.metadata

            const userDetails = await USER.findOne({ _id: userId })
            console.log(userDetails._id, "userId");
            if (!userDetails) {
              res.status(404).json({ message: "user not found" })
            } else {
              const planDetails = await SUBSCRIPTION.findById(planId)
              USER.updateOne({ _id: userId }, {
                $set: {
                  'subscription.plan': planId,
                  'subscription.subscribedAt': Date.now(),
                  premiumuser: true,
                  AdCount: +userDetails.AdCount + +planDetails.extra_ads,
                  ImageCount: +userDetails.ImageCount + +planDetails.extra_images
                }
              }).then((response) => {
                console.log(response, "update status");
                res.status(200).json({ message: "success" }).end()
              }).catch((error) => {
                console.log(error);
                res.status(500).json({ message: error.message }).end()
              })
            }
          }).catch((err) => {
            res.status(500).json({ message: err.message }).end()
            console.log(err.message, "stripe error");
          })

        } else {
          res.status(400).json({ message: "Error occurred while updating" })
        }
      }
    } catch (error) {

      console.log(error.message);
      res.status(500).json({ message: error.message })

    }
    // Return a 200 res to acknowledge receipt of the event
    // res.status(200).json({message:"verified"});
  },


  //pp avanue checkout
  ppCreateOrder: async (req, res) => {
    console.log("createOrder");
    const { userId, subscriptionPlanId } = req.body
    const planDetails = await SUBSCRIPTION.findById(subscriptionPlanId)
    const request = new paypal.orders.OrdersCreateRequest()
    const total = planDetails.monthly_pricing
    request.prefer("request=representation")
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: planDetails.plan_name,
          amount: {
            currency: "USD",
            value: total,
          },
        }
      ]
    })

    try {
      console.log(request.body.purchase_units);
      console.log(request.body.purchase_units[0]);
      const order = await paypalClient.execute(request)
      console.log(order)
      res.status(200).json({id:order.result.id})
    } catch (error) {
      console.log("error",error.message);
      res.status(500).json({error:error.message})
    }

  },


}
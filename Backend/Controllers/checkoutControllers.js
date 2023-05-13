const Stripe = require('stripe')

const stripe = Stripe(process.env.STRIPE_KEY)


module.exports = {

    //stripe checkout
    sripeCheckout :async (req,res)=>{
            const session = await stripe.checkout.sessions.create({
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: 'T-shirt',
                    },
                    unit_amount: 2000,
                  },
                  quantity: 1,
                },
              ],
              mode: 'payment',
              success_url: 'http://localhost:4242/success',
              cancel_url: 'http://localhost:4242/cancel',
            });
            res.send({url:session.url});  
    }
}
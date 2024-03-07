import React, { useContext } from 'react'
import authInstance from '../../../instance/AuthInstance'
import { UserContext } from '../../../Contexts/UserContext'
import { toast } from 'react-toastify'
import { Dnb_Logo } from '../../../Assets/Constants'

const RazorpayButton = ({ plan }) => {
    const user = useContext(UserContext)
    const { User, SetUser } = user

    const RazorpayKey = process.env.REACT_APP_RAZORPAY_KEY


    const handleRazorpayCheckout = (e) => {
        authInstance.post('/api/user/check_out/create_order_razorpay', { userId: User._id, subscriptionPlanId: plan._id }).then((response) => {

            try {

                var options = {
                    "key": RazorpayKey,
                    "amount": response.data.amount,
                    "currency": "INR",
                    "name": "Deal N Buy",
                    "description": plan.plan_name,
                    "image": Dnb_Logo,
                    "order_id": response.data.orderId,
                    "handler": function (response) {

                        authInstance.post('/api/user/check_out/validate_razorpay_order', { ...response, userId: User._id, planId: plan._id }).then((response) => {
                            window.location.reload();
                        }).catch((error) => {
                            toast.error("Payment failed")
                        })
                    },
                    "prefill": {
                        "name": User.fullname,
                        "email": User.email,
                        "contact": User.phoneNumber
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                var rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response) {
                    toast.error("Payment Declined");
                    // alert(response.error.code);
                    // alert(response.error.description);
                    // alert(response.error.source);
                    // alert(response.error.step);
                    // alert(response.error.reason);
                    // alert(response.error.metadata.order_id);
                    // alert(response.error.metadata.payment_id);
                });
                rzp1.open();
                e.preventDefault();
            } catch (error) {
                console.log(error.message);
            }
        }).catch((error) => {
            toast.error("Something Went Wrong");
        })

    };
    return (
        <div>
            <button onClick={handleRazorpayCheckout}>Checkout</button>
        </div>
    )
}

export default RazorpayButton
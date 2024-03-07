import React, { useContext } from 'react'
import Style from './Style.module.css'
import { TiTick } from "react-icons/ti";
import { UserContext } from '../../../Contexts/UserContext';
import authInstance from '../../../instance/AuthInstance';
import { PiCurrencyInrBold } from "react-icons/pi";
import RazorpayButton from '../../PaymentGateway/RazorpayButton/Razorpay';

const Plancard = ({ item }) => {

    const user = useContext(UserContext)
    const { User } = user

    const selectHandler = (e) => {
        e.preventDefault()
        authInstance.post('/api/user/check_out/stripe-checkout', { subscriptionPlanId: item._id, userId: User._id }).then((response) => {         // navigate()
            window.location.replace(response.data.url);
        }).catch((err) => {
            console.log(err);
        })
    }
    return (

        <div className={Style.item_wrap}>
            <div className={Style.wrapper}>
                <div className={Style.top}>
                    <div className={Style.row1}>
                        <h3>{item?.plan_name}</h3>
                        {item?.popular && (<h5>Popular</h5>)}
                    </div>
                    <div className={Style.row2}>
                        <h1><PiCurrencyInrBold /> {item?.monthly_pricing}</h1>
                        <span> / </span>
                        <h4>Month per user</h4>
                    </div>
                    {item?.discount !== "" && (
                        <div className={Style.row3} >
                            <p>{item?.discount}% Discount</p>
                        </div>
                    )}
                    {item?.monthly_pricing > 0 &&
                        <div className={Style.row4}>
                            <RazorpayButton plan={item} />
                        </div>
                    }
                </div>
                <div className={Style.bottom}>
                    <div className={Style.title} >
                        <h2>Features</h2>
                    </div>
                    <div className={Style.row} >
                        {
                            item?.Features.map((item, index) => {
                                return (
                                    <div className={Style.item} key={index} >
                                        <span><TiTick /></span>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Plancard
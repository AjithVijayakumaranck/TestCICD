import React, { useState, useEffect } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import { useParams } from 'react-router-dom'
import adminInstance from '../../../instance/AdminInstance'

const PlanDetails = () => {

    const { subscriptionId } = useParams();

    const [CurrentInput, SetCurrentInput] = useState("");
    const [Features, SetFeatures] = useState([])

    //LoadCategory functions
    useEffect(() => {
        try {
            adminInstance.get(`/api/super_admin/subscription_control/get_singlesubscription/${subscriptionId}`).then((response) => {
                SetCurrentInput(response.data);
                SetFeatures(response.data.Features)
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);







    return (
        <div className={Style.single}>
            <Sidebar />
            <div className={Style.singleContainer}>
                <Header />
                <div className={Style.top}>
                    <div className={Style.left}>
                        <h1 className={Style.title}>Information</h1>
                        <div className={Style.item}>
                            <div className={Style.details}>
                                <div className={Style.detailItem}>
                                    <span className={Style.itemKey}>Plan Name:</span>
                                    <span className={Style.itemValue}> {CurrentInput?.plan_name} </span>
                                </div>
                                <div className={Style.detailItem}>
                                    <span className={Style.itemKey}>Plan Duration:</span>
                                    <span className={Style.itemValue}> {CurrentInput?.plan_name} </span>
                                </div>
                                <div className={Style.detailItem}>
                                    <span className={Style.itemKey}>Discount:</span>
                                    <span className={Style.itemValue}> {CurrentInput?.discount} </span>
                                </div>
                                <div className={Style.detailItem}>
                                    <span className={Style.itemKey}>Monthly Pricing:</span>
                                    <span className={Style.itemValue}> {CurrentInput?.monthly_pricing} </span>
                                </div>
                                <div className={Style.detailItem}>
                                    <span className={Style.itemKey}>yearly_pricing:</span>
                                    <span className={Style.itemValue}>{CurrentInput?.yearly_pricing}</span>
                                </div>
                                <div className={Style.detailItem}>
                                    <span className={Style.itemKey}>Features:</span>
                                    {Features.map((features, index) => {
                                        return (
                                            <div className={Style.featureDetails}>
                                                <span key={index} className={Style.itemValue}>{features},</span>
                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanDetails
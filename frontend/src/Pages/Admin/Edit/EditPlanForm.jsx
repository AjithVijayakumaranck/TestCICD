import React, { useState, useEffect, useRef } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header';
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import instance from '../../../instance/AxiosInstance';
import { Delete } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import adminInstance from '../../../instance/AdminInstance';

const EditPlanForm = ({ title }) => {

    const { subscriptionId } = useParams();
    const navigate = useNavigate();

    const [CurrentInput, SetCurrentInput] = useState("");
    const [FeatureData, SetFeatureData] = useState("")
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

    const handleFeatureAdding = (e) => {
        e.preventDefault()
        SetFeatures([...Features, FeatureData])
        SetFeatureData("")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            adminInstance.put("/api/super_admin/subscription_control/edit_subscription", {
                subscriptionId: subscriptionId, planName: CurrentInput.plan_name,
                planDuration: CurrentInput.plan_duration, features: Features, discount: CurrentInput.discount,
                monthlyPricing: CurrentInput.monthly_pricing, yearlyPricing: CurrentInput.yearly_pricing
            }).then((Response) => {
                toast.success('Sucessfully updated')
                navigate('/admin/plans')
            }).catch((err) => {
                console.log(err);
                toast.error("Something Went Wrong")
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemove = (index) => {
        const updatedProperties = [...Features];
        updatedProperties.splice(index, 1);
        SetFeatures(updatedProperties);
    }

    return (
        <div className={Style.new}>
            <Sidebar />
            <div className={Style.newContainer}>
                <Header />

                <div className={Style.top}>
                    <h1>{title}</h1>
                </div>

                <div className={Style.center}>
                    <div className={Style.right}>

                        <form onSubmit={(e) => handleSubmit(e)}>

                            <div className={Style.formInput}>
                                <label>Plan Name</label>
                                <input type="text"
                                    placeholder="name"
                                    id='planName'
                                    value={CurrentInput.plan_name}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, plan_name: e.target.value }) }}
                                />
                            </div>

                            <div className={Style.formInput}>
                                <label>Plan Duration</label>
                                <input type="text"
                                    placeholder="Plan Duration"
                                    id='planDuration'
                                    value={CurrentInput.plan_duration}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, plan_duration: e.target.value }) }}
                                />
                            </div>


                            <div className={Style.formInput}>
                                <label>Monthly Amount</label>
                                <input type="number"
                                    placeholder="Monthly Amount"
                                    id='Monthlyamount'
                                    value={CurrentInput.monthly_pricing}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, monthly_pricing: e.target.value }) }}
                                />
                            </div>

                            <div className={Style.formInput}>
                                <label>Yearly Amount</label>
                                <input type="number"
                                    placeholder="Yealy Amount"
                                    id='Yearlyamount'
                                    value={CurrentInput.yearly_pricing}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, yearly_pricing: e.target.value }) }}
                                />
                            </div>

                            <div className={Style.formInput}>
                                <label>Discount</label>
                                <input type="number"
                                    placeholder="Discount"
                                    id='discount'
                                    value={CurrentInput.discount}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, discount: e.target.value }) }}
                                />
                            </div>

                            <div className={Style.formInput}></div>

                            <div className={Style.featuresForm}>
                                <div className={Style.formInput}>
                                    <label>Features</label>
                                    <input type="text"
                                        placeholder="Features"
                                        id='features'
                                        value={FeatureData}
                                        onChange={(e) => { SetFeatureData(e.target.value) }}
                                    />
                                </div>
                                <div className={Style.featurebtn}>
                                    <span onClick={(e) => handleFeatureAdding(e)} >Add</span>
                                </div>
                            </div>

                            <div className={Style.formBtn}>
                                <button>Save</button>
                            </div>

                        </form>
                    </div>
                </div>

                <div className={Style.bottomTable}>
                    <h1 className={Style.title}>Features</h1>
                    {Features.map((feature, index) => {
                        return (
                            <div className={Style.details} key={index}>
                                <div className={Style.left}>
                                    <div className={Style.detailItem}>
                                        <span className={Style.itemValue}>{feature}</span>
                                    </div>
                                </div>
                                <div className={Style.right}>
                                    <button onClick={() => handleRemove(index)}><Delete /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default EditPlanForm
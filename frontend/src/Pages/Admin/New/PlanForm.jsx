import React, { useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header';
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import { Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import adminInstance from '../../../instance/AdminInstance';

const PlanForm = ({ title }) => {

    const navigate = useNavigate()
    const [FeatureData, SetFeatureData] = useState("")
    const [Features, SetFeatures] = useState([])
    const [CurrentInput, SetCurrentInput] = useState({
        PlanName: "",
        PlanDuration: "",
        MonthlyPricing: "",
        YearlyPricing: "",
        Discount: "",
        ExtraImage: "",
        ExtraAds: "",
    })

    const handleFeatureAdding = (e) => {
        e.preventDefault()
        SetFeatures([...Features, FeatureData])
        SetFeatureData("")
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            adminInstance.post("/api/super_admin/subscription_control/add_subscription", {
                planName: CurrentInput.PlanName,
                planDuration: CurrentInput.PlanDuration, features: Features, discount: CurrentInput.Discount,
                monthlyPricing: CurrentInput.MonthlyPricing, yearlyPricing: CurrentInput.YearlyPricing,
                extraAds: CurrentInput.ExtraAds, extraImges: CurrentInput.ExtraImage
            }).then((Response) => {
                toast.success('Sucessfully Added')
                navigate('/admin/plans')
                SetCurrentInput({
                    PlanName: "",
                    PlanDuration: "",
                    MonthlyPricing: "",
                    YearlyPricing: "",
                    Discount: "",
                })
                SetFeatures([])

            }).catch((err) => {
                console.log(err);
                toast.error("Something Went Wrong")
            })
        } catch (error) {
            console.log(error);
        }


    }

    // handle remove from table data
    const handleRemove = (index) => {
        const updatedProperties = [...Features];
        updatedProperties.splice(index, 1);
        SetFeatures(updatedProperties);
    };


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
                                    value={CurrentInput.PlanName}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, PlanName: e.target.value }) }}
                                />
                            </div>

                            <div className={Style.formInput}>
                                <label>Plan Duration</label>
                                <input type="text"
                                    placeholder="Plan Duration"
                                    id='planDuration'
                                    value={CurrentInput.PlanDuration}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, PlanDuration: e.target.value }) }}
                                />
                            </div>


                            <div className={Style.formInput}>
                                <label>Monthly Amount</label>
                                <input type="number"
                                    placeholder="Monthly Amount"
                                    id='Monthlyamount'
                                    value={CurrentInput.MonthlyPricing}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, MonthlyPricing: e.target.value }) }}
                                />
                            </div>

                            <div className={Style.formInput}>
                                <label>Yearly Amount</label>
                                <input type="number"
                                    placeholder="Yealy Amount"
                                    id='Yearlyamount'
                                    value={CurrentInput.YearlyPricing}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, YearlyPricing: e.target.value }) }}
                                />
                            </div>

                            <div className={Style.formInput}>
                                <label>Discount</label>
                                <input type="number"
                                    placeholder="Discount"
                                    id='discount'
                                    value={CurrentInput.Discount}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, Discount: e.target.value }) }}
                                />
                            </div>
                            <div className={Style.formInput}>
                                <label>Extra Image</label>
                                <input type="number"
                                    placeholder="Extra Images"
                                    id='extraimages'
                                    value={CurrentInput.ExtraImage}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, ExtraImage: e.target.value }) }}
                                />
                            </div>
                            <div className={Style.formInput}>
                                <label>Extra Ads</label>
                                <input type="number"
                                    placeholder="Extra Ads"
                                    id='extraads'
                                    value={CurrentInput.ExtraAds}
                                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, ExtraAds: e.target.value }) }}
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
                    {Features.map((data, index) => {
                        return (
                            <div className={Style.details} key={index}>
                                <div className={Style.left}>
                                    <div className={Style.detailItem}>
                                        <span className={Style.itemValue}>{data}</span>
                                    </div>
                                </div>
                                <div className={Style.right}>
                                    <button onClick={() => handleRemove()}><Delete /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default PlanForm
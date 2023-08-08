import React, { useEffect, useState } from 'react'
import Style from './index.module.css'
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import instance from '../../instance/AxiosInstance';
import Select from "react-select";




const CategoryFilter = ({ Subcategories, OnMin, OnMax, OnSubcategory, OnState, OnDistrict }) => {


    const [FilterAdd, SetFilterAdd] = useState(true)
    const [CategoryToggle, SetCategoryToggle] = useState(true)
    const [LocationToggle, SetLocationToggle] = useState(false)
    const [PriceToggle, SetPriceToggle] = useState(false)

    const [FilterCollection, SetFilterCollection] = useState("")
    const [MinValue, SetMinValue] = useState("")
    const [MaxValue, SetMaxValue] = useState("")


    const [States, SetStates] = useState([])
    const [StateId, SetStateId] = useState("")
    const [District, SetDistrict] = useState([])


    const subcategoryOptions = Subcategories ? Subcategories.map((data) => ({
        value: data._id,
        label: data.subcategory
    })) : [];

    //Location Fetching 
    useEffect(() => {
        try {
            instance.get(`/api/user/filter/search_state`).then((response) => {
                SetStates(response.data.states)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }, [])


    const StateOptions = States.map((state) => ({
        value: state.state_id,
        label: state.state_name
    }));

    useEffect(() => {
        try {
            instance.get(`/api/user/filter/search_state?districtCode=${StateId}`).then((response) => {
                //console.log(response.data);
                SetDistrict(response.data.districts)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }, [StateId])


    const DistrictOptions = District ? District.map((data) => ({
        value: data.district_id,
        label: data.district_name
    })) : [];

    const HandleFilter = (e) => {
        SetFilterAdd(!FilterAdd);
        if (FilterAdd === false) {
            HandleDelete(e)
        }
    }

    const HandleClearAll = (e) => {
        e.preventDefault()
        SetFilterCollection([])
        SetMinValue('')
        SetMaxValue('')
        OnSubcategory('')
        OnState('')
        OnDistrict('')
    }

    const HandleDelete = (index) => {
        const updatedOptions = [...FilterCollection];
        updatedOptions.splice(index, 1);
        SetFilterCollection(updatedOptions);
    }



    const HandlePriceFilter = (e) => {
        e.preventDefault()
        if (MinValue !== "") {
            OnMin(MinValue)
        }
        if (MaxValue !== "") {
            OnMax(MaxValue)
        }
    };




    return (

        <div className={Style.filter_wrapper}>

            <div className={Style.header}>
                <div className={Style.top}>
                    <h3>Filter</h3>
                    <button onClick={(e) => HandleClearAll(e)}>Clear all</button>
                </div>

                {FilterCollection !== "" ?
                    <div className={Style.bottom}>
                        {FilterCollection.map((filter, index) => {
                            console.log(FilterCollection, "subcategory filter collection");
                            return (
                                <div className={Style.wrap}>
                                    <h5> {filter} </h5>
                                    <span onClick={(e) => HandleDelete(e)}><RxCross2 /></span>
                                </div>
                            )
                        })}
                    </div>
                    : null
                }
            </div>



            <div className={Style.accordion}>

                {/* subcategory listing  */}
                <div className={Style.item}  >
                    <div className={Style.title} onClick={() => SetCategoryToggle(!CategoryToggle)}>
                        <h3>Category</h3>
                        <span>{CategoryToggle ? <SlArrowUp /> : <SlArrowDown />} </span>
                    </div>
                    <div className={CategoryToggle === true ? Style.show : Style.content} >
                        <div className={Style.select_wrap} >
                            <Select
                                options={subcategoryOptions}
                                onChange={(e) => { OnSubcategory(e.value) }}
                            />
                        </div>
                    </div>
                </div>

                {/* State listing  */}
                <div className={Style.item}  >
                    <div className={Style.title} onClick={() => SetLocationToggle(!LocationToggle)} >
                        <h3>Location</h3>
                        <span>{LocationToggle ? <SlArrowUp /> : <SlArrowDown />} </span>
                    </div>
                    <div className={LocationToggle === true ? Style.selectitems : Style.content}>
                        <div className={Style.select_wrap} >
                            <div className={Style.title} >
                                <h3>State</h3>
                            </div>
                            <Select
                                options={StateOptions}
                                onChange={(e) => {
                                    OnState(e.label)
                                    SetStateId(e.value)
                                }}
                            />
                        </div>
                        <div className={Style.select_wrap} >
                            <div className={Style.title} >
                                <h3>District</h3>
                            </div>
                            <Select
                                options={DistrictOptions}
                                onChange={(e) => {
                                    OnDistrict(e.label)
                                }}
                            />
                        </div>

                    </div>
                </div>

                {/* price */}
                <div className={Style.item}  >
                    <div className={Style.title} onClick={() => SetPriceToggle(!PriceToggle)}>
                        <h3>Price</h3>
                        <span>
                            {PriceToggle ? <SlArrowUp /> : <SlArrowDown />}
                        </span>
                    </div>
                    <div className={PriceToggle === true ? Style.show : Style.content} >
                        <div className={Style.items}>
                            <div className={Style.Item_wrap} >
                                <input type="number" placeholder='Min' value={MinValue} onChange={(e) => SetMinValue(e.target.value)} />
                            </div>
                            <div className={Style.Item_wrap} >
                                <input type="number" placeholder='Max' value={MaxValue} onChange={(e) => SetMaxValue(e.target.value)} />
                            </div>
                            <div className={Style.Itembtn_wrap} >
                                <button onClick={(e) => { HandlePriceFilter(e) }} >Filter</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default CategoryFilter
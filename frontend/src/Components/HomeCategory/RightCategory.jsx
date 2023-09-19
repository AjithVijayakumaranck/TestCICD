import React from 'react'
import Style from './Style.module.css'
import { useState } from 'react';
import instance from '../../instance/AxiosInstance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




const RightCategory = () => {

    const navigate = useNavigate()

    const [Categories, SetCategories] = useState([]);
    const [DisplayLimit, SetDisplayLimit] = useState(8);

    const loadcategory = () => {
        instance.get("/api/category/get_categories").then((response) => {
            SetCategories([...response.data]);
        }).catch((error) => {
            console.log(error);
        });
    };


    //LoadCategory functions
    useEffect(() => {
        loadcategory();
    }, []);



    return (
        <>

            <div className={Style.RContainer}>
                <div className={Style.title}>
                    <h3>Explore Popular Category</h3>
                </div>
                <div className={Style.box_wrapper}>
                    {Categories.slice(0, DisplayLimit).map((category, index) => {
                        return (
                            <div className={Style.item} key={index}>
                                <div className={Style.box} onClick={() => navigate(`/category/${category?._id}`)} >
                                    <img src={category?.icon?.url} alt='' />
                                </div>
                                <h6>{category?.categoryName}</h6>
                            </div>
                        )
                    })}
                </div>
            </div>


        </>
    )
}

export default RightCategory


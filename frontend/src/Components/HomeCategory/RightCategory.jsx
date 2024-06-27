import React, { useContext, useState, useEffect } from "react";
import Style from "./Style.module.css";
import instance from "../../instance/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import registerClicks from "../../utilities/getCategoryClicks";


const RightCategory = () => {
    const navigate = useNavigate();
    const userData = useContext(UserContext);
    const { User } = userData;
    const userId = User?._id;

    const [Categories, SetCategories] = useState([]);
    const [DisplayLimit, SetDisplayLimit] = useState(8);

   

    const loadCategories = () => {
        instance
            .get("/api/category/get_categories")
            .then((response) => {

                const sortedObject = response.data.sort((a, b) => b.clicks.length - a.clicks.length);
                
                
                SetCategories(sortedObject)
            })
            .catch((error) => {
                console.log(error);
            });
    };



    useEffect(() => {
        loadCategories();
    }, []);



    const onClickFun = (catId, userId) => {
        registerClicks(catId, userId);
        navigate(`/category/${catId}`);
    };

    return (
        <>
            <div className={Style.RContainer}>
                <div className={Style.title}>
                    <h3>Explore Popular Category</h3>
                </div>
                <div className={Style.box_wrapper}>
                    {Categories.slice(0, DisplayLimit).map((category, index) => (
                        <div className={Style.item} key={index}>
                            <div
                                className={Style.box}
                                onClick={() => onClickFun(category?._id, userId)}
                            >
                                <img src={category?.icon?.url} alt="" />
                            </div>
                            <h6>{category?.categoryName}</h6>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RightCategory;

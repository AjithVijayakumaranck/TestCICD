import React, { useState, useEffect } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import { useParams } from 'react-router-dom'
import adminInstance from '../../../instance/AdminInstance'

const ProductDetails = () => {

    const { productId } = useParams();

    const [ProductData, SetProductData] = useState("");
    const [OtherDet, SetOtherDet] = useState({})
    const [ProductImage, SetProductImage] = useState("")

    const loadProductData = () => {
        try {
            adminInstance.get(`/api/super_admin/product_control/get_singleproduct?productId=${productId}`).then((response) => {
                SetProductData(response.data);
                SetOtherDet({ ...response.data.otherDetails });
                SetProductImage(response.data.images[0].url)
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    //LoadCategory functions
    useEffect(() => {
        loadProductData();
    }, [productId]);






    return (
        <div className={Style.single}>
            <Sidebar />
            <div className={Style.singleContainer}>
                <Header />
                <div className={Style.top}>
                    <div className={Style.left}>
                        <h1 className={Style.title}>Information</h1>
                        <div className={Style.item}>

                            <div className={Style.itemImg}>
                                <img
                                    src={ProductImage ?
                                        ProductImage
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    }
                                    alt="ProductImage"
                                    className={Style.squareImg}
                                />
                            </div>

                            <div className={Style.details}>
                                <h1 className={Style.itemTitle}>{ProductData.title}</h1>
                                <div className={Style.detailItem}>
                                    <span className={Style.itemKey}>Category:</span>
                                    <span className={Style.itemValue}> {ProductData.category} </span>
                                </div>
                                <div className={Style.detailItem}>
                                    <span className={Style.itemKey}>Price:</span>
                                    <span className={Style.itemValue}>{ProductData.price}</span>
                                </div>
                                <div className={Style.detailItem}>
                                    <span className={Style.itemKey}>Description:</span>
                                    <span className={Style.itemValue}>{ProductData.description}</span>
                                </div>
                                {Object.entries(OtherDet).map(([key, value]) => {
                                    return (
                                        <div className={Style.detailItem}>
                                            <span className={Style.itemKey}>{key}:</span>
                                            <span className={Style.itemValue}>{value}</span>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails
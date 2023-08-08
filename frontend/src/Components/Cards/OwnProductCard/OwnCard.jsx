import React from 'react'
import Style from './index.module.css'
import { toast } from "react-toastify";
import authInstance from '../../../instance/AuthInstance';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { MdFavoriteBorder } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom'
import Star from '../../ReviewStars/Star';

const OwnCard = ({ products, reload, userId }) => {

    const Navigate = useNavigate()

    const handleDelete = (itemId) => {
        console.log(itemId);
        try {
            authInstance.delete(`/api/user/${itemId}`).then((Response) => {
                console.log('deleted', Response)
                toast.success("Removed")
                reload(true)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={Style.container}>
            {products.map((product, index) => {
                return (
                    <div className={Style.products} key={index}>
                        <div className={Style.productmedia}>
                            {product.userId.premiumuser ?
                                <span className={Style.productlabel}>Featured</span>
                                : null
                            }
                            <Link>
                                <img src={product.images[0].url} alt="productImage" className={Style.productImage} />
                            </Link>
                            <div className={Style.productAction}>
                                {product?.userId === userId ?
                                    <span onClick={(e) => handleDelete(e)} > <i><MdFavoriteBorder /></i> Remove </span>
                                    : <span onClick={(e) => handleDelete(e)} > <i><MdFavoriteBorder /></i> Favorite </span>
                                }
                                {/* <span onClick={(e) => handleDelete(e)} > <i><MdFavoriteBorder /></i> Remove </span> */}
                                <span onClick={() => Navigate(`/product/${product._id}`)}> <i><HiOutlineViewfinderCircle /></i> Explore </span>
                            </div>
                        </div>
                        <div className={Style.productbody}>
                            <div className={Style.product_cat}>
                                <span> {product.state} </span>
                            </div>
                            <div className={Style.product_title}>
                                <h3> {product.title} </h3>
                            </div>
                            <div className={Style.product_price}>
                                $ {product.price}
                            </div>
                            <div className={Style.rating_container}>
                                <div className={Style.rating}>
                                    <Star stars={product?.totalRating} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default OwnCard
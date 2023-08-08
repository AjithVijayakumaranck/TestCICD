import React from 'react'
import Style from "./index.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { useContext } from 'react';
import { UserContext } from '../../../Contexts/UserContext';
import authInstance from '../../../instance/AuthInstance';
import Star from '../../ReviewStars/Star';

const ProductCard = ({ product }) => {

    const LoggedInUser = useContext(UserContext);
    const { User } = LoggedInUser

    const Navigate = useNavigate()

    const handleFavorite = (e) => {
        e.preventDefault();
        try {
            authInstance.post('/api/user/wishlist/add_wishlist', { userId: User, productId: product._id }).then((Response) => {
                //console.log(Response, 'favorite');
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    //const Reviews = product.userId.ratings ? product.userId.ratings : []
    const star = product.userId.totalrating ? product.userId.totalrating : "0"

    // const RatingStar = Array.from({ length: 5 }, (elem, index) => {
    //     let number = index + 0.5

    //     return (
    //         <span key={index}  >
    //             {stars >= index + 1 ? (<FaStar className={Style.ratingIcon} />)
    //                 : stars >= number ? (<FaStarHalfAlt className={Style.ratingIcon} />)
    //                     : (<AiOutlineStar className={Style.ratingIcon} />)}
    //         </span>
    //     );
    // })



    return (
        <div className={Style.products}>
            <div className={Style.productmedia}>
                {product.userId.premiumuser ?
                    <span className={Style.productlabel}>Featured</span>
                    : null
                }
                <Link>
                    <img src={product.images[0].url} alt="productImage" className={Style.productImage} />
                </Link>
                <div className={Style.productAction}>
                    <span onClick={(e) => handleFavorite(e)} > <i><MdFavoriteBorder /></i> Favorite </span>
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
                        <Star stars={star} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
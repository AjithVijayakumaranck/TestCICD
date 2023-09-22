import React, { useContext, useEffect, useState } from 'react'
import Style from './index.module.css'
import { toast } from "react-toastify";
import authInstance from '../../../instance/AuthInstance';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom'
import Star from '../../ReviewStars/Star';
import { AiFillHeart, AiOutlineDelete } from 'react-icons/ai';
import { UserContext } from '../../../Contexts/UserContext';

const OwnCard = ({ product, reload }) => {

    const LoggedInUser = useContext(UserContext);
    const { User } = LoggedInUser

    const Navigate = useNavigate()

    const [IsClicked, SetIsClicked] = useState(false);
    const [WishlistData, SetWishlistData] = useState([]);


    //LoadCategory functions
    useEffect(() => {
        try {
            authInstance.get(`/api/user/wishlist/get_wishlist/${User?._id}`).then((Response) => {
                SetWishlistData(Response.data)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }, [User?._id]);

    //check weather these product in wishlist
    const findItemId = () => {
        {
            WishlistData.map((Data) => {
                const item = Data.wishlist
                const foundItem = item.find(item => item._id === product._id)
                if (foundItem) {
                    SetIsClicked(true)
                } else {
                    SetIsClicked(false)
                }
            })
        }
    }

    useEffect(() => {
        findItemId();
    }, [WishlistData]);

    const handleFavorite = (e) => {
        e.preventDefault();
        try {
            authInstance.post('/api/user/wishlist/add_wishlist', { userId: User?._id, productId: product?._id }).then((Response) => {
                toast.success("Product Added to Wishlist")
                SetIsClicked(true);
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Delete from wishlist
    const handleFavoriteDelete = (e) => {
        e.preventDefault()
        authInstance.delete(`/api/user/wishlist/remove_wishlist/${User?._id}/${product?._id}`).then((Response) => {
            toast.success("Product removed from Wishlist")
            SetIsClicked(false)
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleDelete = (e) => {
        e.preventDefault()
        try {
            authInstance.delete(`/api/user/${e}`).then((Response) => {
                //toast.success("Removed")
                //reload(true)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={Style.container}>

            <div className={Style.products} >
                <div className={Style.productmedia}>
                    {product?.userId?.premiumuser ?
                        <span className={Style.productlabel}>Featured</span>
                        : null
                    }
                    <Link>
                        <img src={product?.images[0].url} alt="productImage" className={Style.productImage} />
                    </Link>
                    <div className={Style.productAction}>
                        {product?.userId === User?._id ?
                            <span onClick={(e) => handleDelete(e)} > <i><AiOutlineDelete /></i> Remove </span>
                            :
                            <span onClick={(e) => IsClicked ? handleFavoriteDelete(e) : handleFavorite(e)} >
                                <i style={{ color: IsClicked ? 'red' : 'grey' }} ><AiFillHeart /></i> Favorite
                            </span>
                        }
                        <span onClick={() => Navigate(`/product/${product._id}`)}> <i><HiOutlineViewfinderCircle /></i> Explore </span>
                    </div>
                </div>
                <div className={Style.productbody}>
                    <div className={Style.product_cat}>
                        <span> {product?.state} </span>
                    </div>
                    <div className={Style.product_title}>
                        <h3> {product?.title} </h3>
                    </div>
                    <div className={Style.product_price}>
                        $ {product?.price}
                    </div>
                    <div className={Style.rating_container}>
                        <div className={Style.rating}>
                            <Star stars={product?.totalRating} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OwnCard
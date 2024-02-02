import React from 'react'
import Style from "./index.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import authInstance from '../../../instance/AuthInstance'
import { toast } from "react-toastify";
import { PiCurrencyInrBold } from "react-icons/pi";


const WishlistCard = ({ wishlist, user, reload }) => {

  const Navigate = useNavigate();

  const handleDelete = (itemId) => {
    try {
      authInstance.delete(`/api/user/wishlist/remove_wishlist/${user._id}/${itemId}`).then((Response) => {
        reload(true)
        toast.success("Sucessfully Removed item")
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div className={Style.container}>
      <table className={Style.wishlist_table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((data, index) => {
            return (
              <tr key={index} >
                <td className={Style.prod_col} onClick={() => Navigate(`/product/${data?._id}`)}>
                  <div className={Style.product} >
                    <div className={Style.product_media} >
                      <Link>
                        <img src={data ? data.images[0].url : null} alt="productImage" className={Style.productImage} />
                      </Link>
                    </div>
                    <div className={Style.product_title} >
                      <h3>{data?.title}</h3>
                    </div>
                  </div>
                </td>
                <td className={Style.price_col} ><PiCurrencyInrBold/> {data?.price}</td>
                <td className={Style.remove_col} ><button onClick={() => handleDelete(data._id)}> <AiOutlineDelete /> </button></td>
              </tr>
            )
          })}

        </tbody>
      </table>

    </div>
  )
}

export default WishlistCard
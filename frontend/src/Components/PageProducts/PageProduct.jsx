import React from 'react'
import Style from "./index.module.css"
import ProductCard from '../Cards/ProductCard/ProductCard'
import { useNavigate } from 'react-router-dom'



const PageProduct = ({ title, sortedproducts, categoryId }) => {

    const navigate = useNavigate();

    return (
        <div className={Style.productwrapper}>
            <div className={Style.container}>
                <div className={Style.heading}>
                    <div className={Style.left}>
                        <h2>{title}</h2>
                    </div>
                    <div className={Style.right}>
                        <span onClick={() => navigate(`/category/${categoryId}`)}>View All</span>
                    </div>
                </div>
                <div className={Style.cardWrapper}>
                    {sortedproducts.map((card, index) => {
                        return (
                            <ProductCard key={index} product={card} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PageProduct
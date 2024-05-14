import React from "react";
import Style from "./index.module.css";
import ProductCard from "../Cards/ProductCard/ProductCard";
import AddCard from "../Cards/AddCards/AddCards";

const HomeProduct = ({ title, sortedproducts }) => {
  return (
    <div className={Style.productwrapper}>
      <div className={Style.container}>
        <div className={Style.heading}>
          <div className={Style.left}>
            <h2>{title ? title : "Explore Products"}</h2>
          </div>
        </div>
        <div className={Style.cardWrapper}>
          {sortedproducts.map((card, index) => {
            if (card.type === "advertisement") {
              return <AddCard key={index} properties={card} />;
            }
            return <ProductCard key={index} product={card} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeProduct;

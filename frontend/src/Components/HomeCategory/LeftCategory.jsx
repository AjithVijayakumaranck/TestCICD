import React, { useState, useEffect, useContext } from "react";
import Style from "./Style.module.css";
import { useNavigate } from "react-router-dom";
import instance from "../../instance/AxiosInstance";
import { UserContext } from "../../Contexts/UserContext";
import registerClicks from "../../utilities/getCategoryClicks";

const LeftCategory = () => {
  const userData = useContext(UserContext);
  const { User, SetUser } = userData;
  const userId = User?._id;

  const navigate = useNavigate();

  const [Categories, SetCategories] = useState([]);

  const loadcategory = () => {
    instance
      .get("/api/category/get_categories")
      .then((response) => {
        const sortedCategories = response.data.sort((a, b) => {
          const nameA = a.categoryName.toLowerCase();
          const nameB = b.categoryName.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        SetCategories([...sortedCategories]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //LoadCategory functions
  useEffect(() => {
    loadcategory();
  }, []);

  // popular category
  const onClickFun = (catId, userId) => {
    registerClicks(catId, userId);
    navigate(`/category/${catId}`);
  };

  return (
    <div>
      <div className={Style.LeftContainer}>
        <div className={Style.title}>
          <span>Browse Categories</span>
        </div>
        {Categories.map((category, index) => {
          return (
            <div
              className={Style.box}
              key={index}
              onClick={() => onClickFun(category?._id)}
            >
              {/* <img src={category.icon.url} alt='' /> */}
              <span>{category?.categoryName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftCategory;

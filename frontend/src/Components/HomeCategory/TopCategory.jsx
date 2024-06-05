import React, { useContext, useEffect, useState } from "react";
import Style from "./Style.module.css";
import TopArrow from "../../Assets/Icons/TopArrow";
import DownArrow from "../../Assets/Icons/DownArrow";
import { useNavigate } from "react-router-dom";
import instance from "../../instance/AxiosInstance";
import { UserContext } from "../../Contexts/UserContext";
import registerClicks from "../../utilities/getCategoryClicks";

const TopCategory = ({togglefunc,toggleState}) => {
  const userData = useContext(UserContext);
  const { User, SetUser } = userData;
  const userId = User?._id;

 const togglefunction = ()=>{

 }
  const [Categories, SetCategories] = useState([]);
  const [DisplayLimit, SetDisplayLimit] = useState(8);

  console.log(Categories);

 
  const navigate = useNavigate();

  const loadCategories = () => {
    instance
      .get("/api/category/get_categories")
      .then((response) => {
        const sortedObject = response.data.sort(
          (a, b) => b.clicks.length - a.clicks.length
        );

        SetCategories(sortedObject);
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
    <div className={Style.Tcontainer}>
      <div className={Style.categorylist}>
        <div className={Style.category_btn} onClick={()=>{togglefunc(!toggleState)}}>
          <button>All Categories</button>
          <div className={Style.iconWrapper}>
            {toggleState ? (
              <TopArrow />
            ) : (
              <DownArrow className={Style.DownArrow} />
            )}
          </div>
        </div>
        <div>
          <ul>
          {Categories.slice(0, DisplayLimit).map((category, index) => {
              return (
                <li
                  className={Style.box}
                  key={index}
                  onClick={() => onClickFun(category?._id)}
                >
                  {category?.categoryName}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopCategory;

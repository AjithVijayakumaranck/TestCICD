import React, { useContext, useEffect, useState } from "react";
import Style from "./Style.module.css";
import { BiArrowBack } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import instance from "../../../instance/AxiosInstance";
import { toast } from "react-toastify";
import MobileTile from "./MobileTile";
import { UserContext } from "../../../Contexts/UserContext";


const PostAdd = () => {

  const Navigate = useNavigate();
  const USER = useContext(UserContext)
  const { User, SetUser } = USER



  const [categories, setCategories] = useState([]);
  const [Subcategories, setSubCategories] = useState([]);
  const [toggle, setToggle] = useState(false);


  //functions
  const mountingfunction = async () => {
    instance.get(`/api/user/profile/get_profile/${User._id}`).then((response) => {
      if (response.data.Adcount <= 0) {
        Navigate(`/purchaseads`)
      }
      else {
        instance
          .get("/api/category/get_categories")
          .then((response) => {
            setCategories([...response.data]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }).catch((err) => {
      console.log(err.data);
    })
  };

  // SubCat selector
  const subCategorySelector = (categoryId) => {
    instance
      .get(`/api/category/get_singlecategory?categoryId=${categoryId}`)
      .then((response) => {
        setSubCategories([...response.data.subcategory]);
        //console.log(response.data.subcategory, "data");
        setToggle(true);
      }).catch((err) => {
        toast.error(err.response.data.message)
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  //Mounting functions
  useEffect(() => {
    mountingfunction();
  }, []);


  return (
    <div className={Style.main_container}>

      <div className={Style.header_wrapper}>
        <div className={Style.backarrow} onClick={() => Navigate(-1)} >
          <BiArrowBack />
        </div>
      </div>

      <div className={Style.container_wrapper}>
        <div className={Style.container}>
          <div className={Style.left_container}>
            <div className={Style.box_title}>
              <h3>Choose your Category</h3>
            </div>

            {categories.map((value, index) => {
              return (
                <div
                  key={index}
                  className={Style.box}
                  onClick={() => subCategorySelector(value._id)}
                >
                  <label>{value.categoryName}</label>
                  <span>
                    {" "}
                    <BsChevronRight />
                  </span>
                </div>
              );
            })}
          </div>

          <div className={Style.right_container}>
            {toggle ? (
              <div>
                {Subcategories.map((value, index) => {
                  return (
                    <div key={index} className={Style.box} onClick={() => { Navigate(`/registerad/${value._id}`) }}>
                      <label>{value.subcategory}</label>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <MobileTile />

      <div className={Style.footer_wrapper}>
        <div className={Style.content} onClick={() => Navigate("/")} >
          copywrite@DealNbuy2023
        </div>
      </div>

    </div>

  );

};

export default PostAdd;

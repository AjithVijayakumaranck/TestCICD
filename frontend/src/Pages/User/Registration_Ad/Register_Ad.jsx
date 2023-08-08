import React, { useState } from "react";
import Footer from "../../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import instance from "../../../instance/AxiosInstance";
import RegisterForm from "../../../Components/Registration_Forms/RegisterForms";


const Register_Ad = () => {

  const { subCategoryId } = useParams();
  console.log(subCategoryId, "registerad subcat Id");

  //states
  const [SubCategory, SetSubCategory] = useState("");
  const [FormData, SetFormData] = useState([]);


  //moount functions
  useEffect(() => {
    try {
      instance.get(`/api/category/get_singlesubcategory?subCategoryId=${subCategoryId}`).then((response) => {
        console.log(response.data, "single sub category data");
        SetSubCategory(response.data);
        SetFormData(response.data.formInputs)
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  }, [subCategoryId]);



  return (
    <React.Fragment>
      <RegisterForm FormInputs={FormData} SubCategoryData={SubCategory} />
      <Footer />
    </React.Fragment>
  );
};

export default Register_Ad;

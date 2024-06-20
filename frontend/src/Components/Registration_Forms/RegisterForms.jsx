import React, { useState, useContext, useEffect } from "react";
import Style from "./Style.module.css";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import instance from "../../instance/AxiosInstance";
import { BiArrowBack } from "react-icons/bi";
import { UserContext } from "../../Contexts/UserContext";
import { toast } from "react-toastify";
import authInstance from "../../instance/AuthInstance";
import LoadingSpin from "react-loading-spin";
import PopupModel from "../Models/PopupModel/PopupModel";

const RegisterForm = ({FormInputs,SubCategoryData,subCategoryId}) => {
  const LoggedInUser = useContext(UserContext);
  const { User, SetUser } = LoggedInUser;

  const Navigate = useNavigate();

  const [ProductData, SetProductData] = useState({
    title: "",
    description: "",
    price: "",
    listedBy: "",
    locality: "",
    district: "",
    state: "",
    region: "",
  });

  const [Loading, SetLoading] = useState(false);
  const [Categories, SetCategories] = useState("");

  const [OtherDet, SetOtherDet] = useState({});
  const [UserData, SetUserData] = useState([]);
  const [SelectedNest, SetSelectedNest] = useState(null);
  const [Error, SetError] = useState({});
  const [File, SetFile] = useState([]);

  const [IsLocalityDisabled, SetIsLocalityDisabled] = useState(true);
  const [States, SetStates] = useState([]);

  const [StateId, SetStateId] = useState("");
  const [District, SetDistrict] = useState([]);
  const [DistrictId, SetDistrictId] = useState("");
  const [Locality, SetLocality] = useState([]);

  const [Limit, SetLimit] = useState(0);
  const [ModelOpen, SetModelOpen] = useState(false);

  const options = [
    { value: "India", label: "India" },
    { value: "France", label: "France" },
  ];

  //Location Fetching
  useEffect(() => {
    try {
      instance
        .get(`/api/user/filter/search_state`)
        .then((response) => {
          SetStates(response.data.states);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const StateOptions = States.map((state) => ({
    value: state.state_id,
    label: state.state_name,
  }));

  
  const [NestedData,SetNestedData] = useState([])

  //mount functions
  useEffect(() => {
    console.log(SubCategoryData);
    try {
      instance
        .get(
          `/api/category/get_singlesubcategory?subCategoryId=${subCategoryId}`
        )
        .then((response) => {
          let nestedData = []
          response.data?.nestedCategories.map((nestedCat) => {
            if(nestedCat){
              nestedData.push({value:nestedCat._id,label:nestedCat.nestedCat})   
            }
          });
          SetNestedData(nestedData)

          console.log(NestedData);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);



  useEffect(() => {
    try {
      instance
        .get(`/api/user/filter/search_state?districtCode=${StateId}`)
        .then((response) => {
          SetDistrict(response.data.districts);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [StateId]);

  const DistrictOptions = District
    ? District.map((data) => ({
        value: data.district_id,
        label: data.district_name,
      }))
    : [];

  useEffect(() => {
    try {
      instance
        .get(`/api/user/filter/search_locality?district=${DistrictId}`)
        .then((response) => {
          SetLocality(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [DistrictId]);

  const LocalityOptions = Locality
    ? Locality.map((data) => ({
        value: data.village_locality_name,
        label: data.village_locality_name,
      }))
    : [];

  //User details
  useEffect(() => {
    try {
      instance
        .get(`/api/user/profile/get_profile/${User._id}`)
        .then((Response) => {
          SetUserData(Response.data);
          SetLimit(Response.data?.ImageCount);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [User._id]);

  //load Category data
  useEffect(() => {
    try {
      instance
        .get(
          `/api/category/get_SingleCategory?categoryId=${SubCategoryData.category}`
        )
        .then((response) => {
          SetCategories(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [SubCategoryData]);

  //Image upload function
  const uploadFile = (e) => {
    const files = Array.from(e.target.files);

    if (File.length + files.length <= Limit) {
      SetFile([...File, ...files]);
      SetError({ ...Error, imgfile: "" });
    } else {
      SetError({
        ...Error,
        imgfile: `You can only upload up to ${Limit} images.`,
      });
      e.target.value = "";
    }
  };

  // -------------validation---------------

  const validateForm = () => {
    let newErrors = {};

    if (ProductData.title === "") {
      newErrors.title = "Title is required";
    }
    if (ProductData.description === "") {
      newErrors.description = "Description is required";
    }
    if (ProductData.price === "") {
      newErrors.price = "Price is required";
    }
    if (ProductData.listedBy === "") {
      newErrors.listedBy = "listedByis required";
    }
    if (ProductData.district === "") {
      newErrors.district = "district is required";
    }
    if (ProductData.state === "") {
      newErrors.state = "state is required";
    }
    if (ProductData.region === "") {
      newErrors.region = "region is required";
    }
    if (File.length === 0) {
      newErrors.imgfile = "Product image is required";
    }

    SetError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Handle Submit function
  const HandleSubmit = (e) => {
    e.preventDefault();
    SetLoading(true);

    if (validateForm()) {
      let data = new FormData();

      File.forEach((file) => {
        data.append("files", file);
      });

      const objectData = JSON.stringify(OtherDet);
      data.append("otherDetails", objectData);

      data.append("title", ProductData.title);
      data.append("description", ProductData.description);
      data.append("subcategory", SubCategoryData?._id);
      data.append("nestedCat",SelectedNest)
      data.append("category", Categories._id);
      data.append("userId", User?._id);
      data.append("price", ProductData.price);
      data.append("listedBy", ProductData.listedBy);
      data.append("locality", ProductData.locality);
      data.append("district", ProductData.district);
      data.append("state", ProductData.state);
      data.append("region", ProductData.region);
      data.append("featured", User?.premiumuser);

      if (UserData?.AdCount > 0) {
        authInstance
          .post("api/user/product/addproduct", data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            SetLoading(false);
            toast.success("Product Added Successfully");
            Navigate("/postadd");

            SetProductData({
              title: "",
              description: "",
              price: "",
              listedBy: "",
              locality: "",
              district: "",
              state: "",
              region: "",
            });
            SetOtherDet({});
            SetFile([]);
          })
          .catch((err) => {
            SetLoading(false);
            toast.error("Something Went Wrong");
          });
      } else {
        SetLoading(false);
        SetModelOpen(true);
      }
    } else {
      SetLoading(false);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className={Style.Main_Container}>
      <div className={Style.header_wrapper}>
        <div className={Style.backarrow} onClick={() => Navigate("/postadd")}>
          <BiArrowBack />
        </div>
      </div>

      {ModelOpen && <PopupModel SetModel={SetModelOpen} />}

      <div className={Style.Container_Wrapper}>
        <h3>POST YOUR AD DETAILS</h3>
        <div className={Style.path}>
          <span>
            {" "}
            {Categories.categoryName} / {SubCategoryData.subcategory}{" "}
          </span>
          <Link to="/postadd">Change</Link>
        </div>

        <form action="#" onSubmit={(e) => HandleSubmit(e)}>
          <div className={Style.row}>
            <label>
              {" "}
              Title
              <span className="star">*</span>{" "}
            </label>
            <div className={Style.items}>
              <input
                type="text"
                name="title"
                value={ProductData.title}
                onChange={(e) => {
                  SetProductData({ ...ProductData, title: e.target.value });
                }}
              />
              <span>{Error.title}</span>
              <p>
                {" "}
                Mention the key features of item(eg. Brand, Model,Typeetc.){" "}
              </p>
            </div>
          </div>

          {/* selector input */}
          {FormInputs.map((Input, index) => {
            if (Input.type === "select") {
              return (
                <div key={index} className={Style.row}>
                  <label>
                    {Input.label}
                    {Input.important === "true" ? (
                      <span className="star">*</span>
                    ) : null}{" "}
                  </label>
                  <div className={Style.items}>
                    <Select
                      options={Input.options}
                      className={Style.basic_single}
                      name={Input.name}
                      onChange={(e) => {
                        SetOtherDet({ ...OtherDet, [Input.label]: e.value });
                      }}
                    />
                  </div>
                </div>
              );
            }
          })}

          {/* nestedcat selector */}
          <div className={Style.row}>
            <label>
              Nested category <span className="star">*</span>{" "}
            </label>
            <div className={Style.items}>
              <Select
                options={NestedData}
                className={Style.basic_single}
                name={NestedData.value}
                onChange={(e) => {
                  SetSelectedNest(e.value)
                }}
              />
            </div>
          </div>

          {/* text input */}
          {FormInputs.map((Input, index) => {
            if (Input.type === "text") {
              return (
                <div className={Style.row} key={index}>
                  <label>
                    {Input.label}
                    {Input.important === "true" ? (
                      <span className="star">*</span>
                    ) : null}{" "}
                  </label>
                  <div className={Style.items}>
                    <input
                      type={Input.type}
                      name={Input.label}
                      onChange={(e) => {
                        SetOtherDet({
                          ...OtherDet,
                          [Input.label]: e.target.value,
                        });
                      }}
                    />
                    <p>
                      {" "}
                      Mention the key features of item(eg. Brand,
                      Model,Typeetc.){" "}
                    </p>
                  </div>
                </div>
              );
            }
          })}

          {/* radioinput */}
          {FormInputs.map((Input, index) => {
            if (Input.type === "radio") {
              return (
                <div className={Style.row} key={index}>
                  <label>
                    {" "}
                    {Input.label}
                    {Input.important === "true" ? (
                      <span className="star">*</span>
                    ) : null}{" "}
                  </label>
                  <div className={Style.radioFieldItems}>
                    {Input.options.map((Radios, index) => {
                      return (
                        <div className={Style.radio} key={index}>
                          <input
                            type={Input.type}
                            id={Radios}
                            name={Input.label}
                            value={Radios}
                            onChange={(e) => {
                              SetOtherDet({
                                ...OtherDet,
                                [Input.label]: e.target.value,
                              });
                            }}
                          />
                          <label className={Style.radioLabel} htmlFor={Radios}>
                            {Radios}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}

          {/* Discriptions */}
          <div className={Style.row}>
            <label>
              Description
              <span className="star">*</span>{" "}
            </label>
            <div className={Style.items}>
              <textarea
                name="description"
                placeholder="More Informations"
                value={ProductData.description}
                onChange={(e) => {
                  SetProductData({
                    ...ProductData,
                    description: e.target.value,
                  });
                }}
                cols="40"
                rows="5"
              ></textarea>
              <span>{Error.description}</span>
            </div>
          </div>

          {/* ImageUpload */}
          <div className={Style.row}>
            <label>
              Images <span className="star">*</span>{" "}
            </label>
            <div className={Style.image_wrapper}>
              <label For="file-input">
                {" "}
                <MdOutlineAddAPhoto />{" "}
              </label>

              <input
                type="file"
                onChange={(e) => uploadFile(e)}
                id="file-input"
                multiple
              />

              {/* image viewers */}
              {File.map((eachImage, index) => {
                return (
                  <div key={index} className={Style.image_sec}>
                    <img
                      src={eachImage ? URL.createObjectURL(eachImage) : null}
                      alt={`image ${index}`}
                    />

                    <div className={Style.clearbtn}>
                      <button>
                        {" "}
                        <RxCross2
                          onClick={() => {
                            File.splice(index, 1);
                          }}
                        />{" "}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <span style={{ color: "red", fontSize: "14px" }}>
                {Error?.imgfile}
              </span>
            </div>
            <div>
              <p>
                You can only upload up to {Limit} images. Choose multiple photos
                by choosing your best photo first as displayed in front and then
                add rest of photos with different angles to shows specifications
                or damages if any.
              </p>
            </div>
          </div>

          <div className={Style.price_section}>
            <h3> SET PRICE </h3>
            <div className={Style.row}>
              <label>
                Price
                <span className="star">*</span>{" "}
              </label>
              <div className={Style.items}>
                <input
                  type="number"
                  placeholder="Price"
                  value={ProductData.price}
                  onChange={(e) => {
                    SetProductData({ ...ProductData, price: e.target.value });
                  }}
                />
                <span>{Error.price}</span>
              </div>
            </div>
          </div>

          <div className={Style.seller_section}>
            <h3>Your Details</h3>
            <div className={Style.row}>
              <label>
                Listed by
                <span className="star">*</span>{" "}
              </label>
              <div className={Style.radioFieldItems}>
                <div className={Style.radio}>
                  <input
                    type="radio"
                    id="listed"
                    name="listed"
                    value="Dealer"
                    onChange={(e) => {
                      SetProductData({
                        ...ProductData,
                        listedBy: e.target.value,
                      });
                    }}
                  />
                  <label className={Style.radioLabel} htmlFor="">
                    Dealer
                  </label>
                </div>
                <div className={Style.radio}>
                  <input
                    type="radio"
                    id="listed"
                    name="listed"
                    value="Owner"
                    onChange={(e) => {
                      SetProductData({
                        ...ProductData,
                        listedBy: e.target.value,
                      });
                    }}
                  />
                  <label className={Style.radioLabel} htmlFor="">
                    Owner
                  </label>
                </div>
              </div>
              <span>{Error.listedBy}</span>
            </div>

            <div className={Style.location_wrap}>
              <div className={Style.col}>
                <label>
                  {" "}
                  State <span className="star">*</span>{" "}
                </label>
                <Select
                  options={StateOptions}
                  isSearchable={true}
                  onChange={(e) => {
                    SetProductData({ ...ProductData, state: e.label });
                    SetStateId(e.value);
                  }}
                />
                <span>{Error.state}</span>
              </div>

              {District && District.length > 0 && (
                <div className={Style.col}>
                  <label>
                    {" "}
                    District <span className="star">*</span>{" "}
                  </label>
                  <Select
                    options={DistrictOptions}
                    onChange={(e) => {
                      SetProductData({ ...ProductData, district: e.label });
                      SetDistrictId(e.label);
                      SetIsLocalityDisabled(false);
                    }}
                  />
                  <span>{Error.district}</span>
                </div>
              )}
            </div>

            <div className={Style.location_wrap}>
              {Locality && Locality.length > 0 && (
                <div className={Style.col}>
                  <label>
                    {" "}
                    Locality <span className="star">*</span>{" "}
                  </label>
                  <Select
                    options={LocalityOptions}
                    isDisabled={IsLocalityDisabled}
                    onChange={(e) => {
                      SetProductData({ ...ProductData, locality: e.value });
                    }}
                  />
                  <span>{Error.locality}</span>
                </div>
              )}

              <div className={Style.col}>
                <label>
                  {" "}
                  Country <span className="star">*</span>{" "}
                </label>
                <Select
                  options={options}
                  onChange={(e) => {
                    SetProductData({ ...ProductData, region: e.value });
                  }}
                />
                <span>{Error.country}</span>
              </div>
            </div>

            <label> Name </label>
            <div className={Style.items}>
              <input type="text" name="name" value={UserData.fullname} />
            </div>

            <label>Email Id </label>
            <div className={Style.items}>
              <input type="email" name="email" value={UserData.email} />
            </div>

            <label>Phone Number </label>
            <div className={Style.items}>
              <input
                type="text"
                name="phonenumber"
                value={UserData.phoneNumber}
              />
            </div>
          </div>
          <div className={Style.submit_section}>
            <button>
              {Loading ? (
                <LoadingSpin size="20px" direction="alternate" width="4px" />
              ) : (
                "Post Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

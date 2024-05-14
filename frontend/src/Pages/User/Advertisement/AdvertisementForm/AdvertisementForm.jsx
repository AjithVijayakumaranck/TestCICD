import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx';
import Select from 'react-select'
import Style from "./Style.module.css";
import { UserContext } from '../../../../Contexts/UserContext';
import instance from '../../../../instance/AxiosInstance';
import authInstance from '../../../../instance/AuthInstance';
import { CategoryContext } from '../../../../Contexts/CategoryContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingSpin from "react-loading-spin";


const AdvertisementForm = () => {

  const Navigate = useNavigate()

//states
  const [ProductData, SetProductData] = useState({
    title: "",
    description: "",
    redirectionUrl:"",
    locality: "",
    district: "",
    state: "",
    region: "",
    advSize:"",
    category:"",
    subCategory:""
  })

  const [File, SetFile] = useState([]);
  const [Error , SetError] = useState({
     imagefile:""
    })


    const [IsLocalityDisabled, SetIsLocalityDisabled] = useState(true);
    const [States, SetStates] = useState([])
    const [StateId, SetStateId] = useState("")
    const [District, SetDistrict] = useState([])
    const [DistrictId, SetDistrictId] = useState("")
    const [Locality, SetLocality] = useState([])
    const [CatSelecter,SetCatSelecter] = useState([])
    const [SubCatSelecter,SetSubCatSelecter] = useState([])
    const [loading, setLoading] = useState(false);



  //CONTEXTS
  const LoggedInUser = useContext(UserContext);
  const {User, SetUser} = LoggedInUser

  const categories = useContext(CategoryContext)
  const {Categories} = categories



 useEffect(()=>{
   let Cats = []
  Categories.map((eachCategories,index)=>{
    Cats.push({value:eachCategories._id,label:eachCategories.categoryName})
  })
  SetCatSelecter([...CatSelecter,...Cats])
 },[])


 const catSelector = (e) =>{
  SetProductData({ ...ProductData, category: e.value }) 
    instance.get(`/api/category/get_singlecategory?categoryId=${e.value}`).then((response)=>{  
        let SubCats = []
         response.data.subcategory.map((eachSubCategories,index)=>{
         SubCats.push({value:eachSubCategories._id,label:eachSubCategories.subcategory})
       })
       SetSubCatSelecter([SubCatSelecter,...SubCats])
    })
  // }
}

  

  //Location Fetching 
  useEffect(() => {
    try {
      instance.get(`/api/user/filter/search_state`).then((response) => {
        SetStates(response.data.states)
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }, [])


  const StateOptions = States.map((state) => ({
    value: state.state_id,
    label: state.state_name
  }));

  useEffect(() => {
    try {
      instance.get(`/api/user/filter/search_state?districtCode=${StateId}`).then((response) => {
        SetDistrict(response.data.districts)
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }, [StateId])


  const DistrictOptions = District ? District.map((data) => ({
    value: data.district_id,
    label: data.district_name
  })) : [];

  useEffect(() => {
    try {
      instance.get(`/api/user/filter/search_locality?district=${DistrictId}`).then((response) => {
        SetLocality(response.data)
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }, [DistrictId])

  const LocalityOptions = Locality ? Locality.map((data) => ({
    value: data.village_locality_name,
    label: data.village_locality_name
  })) : [];



  


  
  

  //REACT SELECT OPTIONS
  const options = [
    { value: "2", label: "2X size" },
    { value: "3", label: "3X size" },
    { value: "4", label: "4X size" }
  ]
  
 //upload file
  const uploadFile = (e) => {
    const files = e.target.files;

    if (File.length  < 1) {
      SetFile([...File, ...files]);
      SetError({ ...Error, imgfile: "" })
    } else {
      SetError({ ...Error, imgfile: `You can only upload one image` });
      e.target.value = "";
    }
  }


  //handleSubmit
  const handleSubmit = async(e) => {
    e.preventDefault()
    let data = new FormData()

    File.forEach((file) => {
      data.append("files", file)
    });

    data.append("title", ProductData.title)
    data.append("subcategory", ProductData.subCategory)
    data.append("category", ProductData.category)
    data.append("userId", User?._id)
    data.append("locality", ProductData.locality)
    data.append("district", ProductData.district)
    data.append("state", ProductData.state)
    data.append("region", ProductData.region)
    data.append("featured", User?.premiumuser)
    data.append("redirectionUrl",ProductData.redirectionUrl)
    data.append("advSize",ProductData.advSize)

    //api call
    setLoading(true)
    authInstance.post('/api/user/advertisement/add_new_adv', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => {
      setLoading(false)
        toast.success("Product Added Successfully")
        Navigate('/')
       
        SetProductData({
          title: "",
          description: "",
          redirectionUrl:"",
          locality: "",
          district: "",
          state: "",
          region: "",
          advSize:"",
          category:"",
          subCategory:""
        })


      }).catch((err) => {
      setLoading(false)
        toast.error("Something Went Wrong")
      })
    
    
  }

  return (
    <div className={Style.Main_Container}>
      <div className={Style.Container_Wrapper}>
        <form action="#" onSubmit={handleSubmit}>
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
                required
              />
              <p>
                {" "}
                Mention the key features of item(eg. Brand, Model,Typeetc.){" "}
              </p>
            </div>
          </div>

          <div className={Style.row}>
            <label>
              {" "}
              Redirection URL
              <span className="star">*</span>{" "}
            </label>
            <div className={Style.items}>
              <input
                type="text"
                name="title"
                value={ProductData.redirectionUrl}
                onChange={(e) => {
                  SetProductData({
                    ...ProductData,
                    redirectionUrl: e.target.value,
                  });
                }}
                required
              />
              <p>
                {" "}
                Mention the key features of item(eg. Brand, Model,Typeetc.){" "}
              </p>
            </div>
          </div>

          <div className={Style.row}>
            <label>Advertisement Size</label>
            <div>
              <Select
                options={options}
                name="Advertisement Size"
                onChange={(e) => {
                  SetProductData({ ...ProductData, advSize: e.value });
                }}
                required
              />
            </div>
          </div>

          <div className={Style.row}>
            <label>Category</label>
            <div>
              <Select
                options={CatSelecter}
                name="Category"
                onChange={catSelector}
                required
              />
            </div>
          </div>

          {ProductData.category == "" ? null : (
            <div className={Style.row}>
              <label>subcategory</label>
              <div>
                <Select
                  options={SubCatSelecter}
                  name="SubCategory"
                  onChange={(e) => {
                    SetProductData({ ...ProductData, subCategory: e.value });
                  }}
                  required
                />
              </div>
            </div>
          )}

          {/* image uploading */}

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
                required
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
                            SetFile([]);
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
                You can only upload up to one image. Choose multiple photos by
                choosing your best photo first as displayed in front and then
                add rest of photos with different angles to shows specifications
                or damages if any.
              </p>
            </div>
          </div>

          <div className={Style.row}>
            <label>
              {" "}
              Country <span className="star">*</span>{" "}
            </label>
            <Select
              options={[{ value: "india", label: "india" }]}
              onChange={(e) => {
                SetProductData({ ...ProductData, region: e.value });
              }}
            />
            <span>{Error.country}</span>
          </div>

          <div className={Style.location_wrap}>
            <div className={Style.row}>
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
              <div className={Style.row}>
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
              <div className={Style.row}>
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
          </div>
          <div className={Style.submit_section}>
            <button>
              {loading ? (
                <LoadingSpin size="20px" direction="alternate" width="4px" />
              ) : (
                "Add Advertisement"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdvertisementForm
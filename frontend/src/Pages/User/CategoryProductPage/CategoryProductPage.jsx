import React, { useState, useEffect,useContext } from "react";
import {useNavigate} from "react-router-dom"
import Style from "./index.module.css";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import ProductCard from "../../../Components/Cards/ProductCard/ProductCard";
import instance from "../../../instance/AxiosInstance";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { useParams } from "react-router-dom";
import ProductFilter from "../../../Components/ProductFilter/ProductFilter";
import registerSubCatClicks from "../../../utilities/getSubCategoryClicks";
import { UserContext } from "../../../Contexts/UserContext";



const CategoryProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegment = location.pathname.split("/").filter((segment) => segment);

  const { categoryId } = useParams();

  const [Categories, SetCategories] = useState([]);
  const [Products, SetProducts] = useState([]);
  const [CurrentPage, SetCurrentPage] = useState(0);
  const [Subcategory, SetSubcategory] = useState([]);
  const [Filters, SetFilters] = useState([]);

  const [DefaultId, SetDefaultId] = useState(categoryId);
  const [Min, SetMin] = useState("");
  const [Max, SetMax] = useState("");
  const [SubValue, SetSubValue] = useState("");
  const [StateValue, SetStateValue] = useState("");
  const [OtherSelectedFilter, SetOtherSelectedFilter] = useState({});

  const [DistrictValue, SetDistrictValue] = useState("");
  const [SortedProducts, SetSortedProducts] = useState([]);

  const [IsLastPage, SetIsLastPage] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [DisplayLimit, SetDisplayLimit] = useState(8);
  const [Subcategories, SetSubcategories] = useState([]);
  const [FilteredSubCat, SetFilteredSubCat] = useState([]);
  
  //poular catrgories state
  const [PopCat, SetPopCat] = useState([]);

  //subcategory fetching function
  
const userData = useContext(UserContext);
const { User } = userData;
const userId = User?._id;

  const loadSubCategories = () => {
    instance
      .get("/api/category/get_subcategory")
      .then((response) => {
        const sortedObject = response.data.sort((a, b) => b.clicks.length - a.clicks.length);
        

        const filteredSubCats = sortedObject.filter(
          (subCat) => subCat.mainCategoryId === categoryId
        );
      
        SetFilteredSubCat(filteredSubCats);

        
      })
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    loadSubCategories();
  }, [categoryId]);

  
  //top pick modal on mobile divices

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleMediaChange = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) {
        setIsToggled(true); // Ensure pop_sub is visible on large screens
      } else {
        setIsToggled(false); // Default to hidden on small screens
      }
    };

    // Set initial value
    handleMediaChange(mediaQuery);

    // Add event listener
    mediaQuery.addEventListener("change", handleMediaChange);

    // Clean up event listener
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      setIsToggled(!isToggled);
    }
  };

  useEffect(() => {
    instance
      .get(`/api/category/get_SingleCategory?categoryId=${categoryId}`)
      .then((response) => {
        SetCategories(response.data);
        SetSubcategory((prevCat) => {
          if (prevCat !== response.data?.subcategory) {
            return response.data?.subcategory;
          }
          return prevCat;
        });

        SetFilters(response.data?.filters);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryId, SetSubcategory]);

  //popoular category function

  const loadCategories = () => {
    instance
      .get("/api/category/get_categories")
      .then((response) => {
        const sortedObject = response.data.sort(
          (a, b) => b.clicks.length - a.clicks.length
        );

        SetPopCat(sortedObject);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);


  const loadProducts = () => {
    try {
      instance
        .get(
          `/api/user/filter/filter_products?category=${categoryId}&min=${Min}&max=${Max}&page=${CurrentPage}
            &state=${StateValue}&subcategory=${SubValue}&district=${DistrictValue}&other=${JSON.stringify(
            OtherSelectedFilter
          )}`
        )
        .then((response) => {
          SetProducts([...response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const findPremiumProducts = () => {
    const sortedProducts = Products.sort((a, b) => {
      if (a.featured && !b.featured) {
        return -1;
      } else if (!a.featured && b.featured) {
        return 1;
      }
      return 0;
    });
    SetSortedProducts(sortedProducts);
  };

  // -- functions to check that islast page
  useEffect(() => {
    try {
      instance
        .get(`/api/user/product/check_lastpage?page=${CurrentPage}`)
        .then((response) => {
          SetIsLastPage(response?.data?.lastPage);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [CurrentPage]);

  useEffect(() => {
    findPremiumProducts();
  }, [Products]);

  //LoadCategory functions
  useEffect(() => {
    loadProducts();
  }, [
    CurrentPage,
    Min,
    Max,
    SubValue,
    StateValue,
    DistrictValue,
    OtherSelectedFilter,
    categoryId,
    DefaultId,
  ]);

  const handlePreviousPage = () => {
    if (CurrentPage > 1) {
      SetCurrentPage(CurrentPage - 12);
    }
  };

  const handleNextPage = () => {
    if (IsLastPage === false) {
      SetCurrentPage(CurrentPage + 12);
    }
  };

  const HandleDefault = () => {
    SetDefaultId(categoryId);
    SetMax("");
    SetMin("");
    SetSubValue("");
    SetStateValue("");
    SetDistrictValue("");
    SetOtherSelectedFilter("");
  };

  const HandleMin = (value) => {
    SetMin(value);
  };

  const HandleMax = (value) => {
    SetMax(value);
  };

  const HandleSubcategory = (value) => {
    SetSubValue(value);
  };

  const HandleState = (value) => {
    SetStateValue(value);
  };

  const HandleDistrict = (value) => {
    SetDistrictValue(value);
  };

  const HandleOtherFilter = (value) => {
    SetOtherSelectedFilter({ ...OtherSelectedFilter, ...value });
  };

  function ScrollToTopOnMount() {
    window.scrollTo(0, 0);
    return null;
  }

  useEffect(() => {
    ScrollToTopOnMount();
  }, []);


  
  const onClickFun = (catId, userId) => {
    // registerSubCatClicks(catId, userId);
    navigate(`/category/${catId}`);
};
console.log(Categories._id,"category Id");

  return (
    <div className={Style.page_wrapper}>
      <ScrollToTopOnMount />
      <Navbar />
      <div className={Style.main}>
        <Breadcrumb
          customName={Categories?.categoryName}
          pathSegments={pathSegment}
        />
        <div className={Style.productwrapper}>
          <div className={Style.container}>
            <div className={Style.heading}>
              <div className={Style.left}>
                <h2>{Categories?.categoryName}</h2>
              </div>
              <div className={Style.right}>
                <span></span>
              </div>
            </div>

            <div className={Style.Wrapper}>
              <div className={Style.Left_container}>
                <ProductFilter
                  FilterOptions={Filters}
                  Subcategories={Subcategory}
                  onChangeSubcategory={HandleSubcategory}
                  onMax={HandleMax}
                  onMin={HandleMin}
                  otherSelectedFilter={HandleOtherFilter}
                  onDistrict={HandleDistrict}
                  onState={HandleState}
                  load={HandleDefault}
                  OtherSelectedFilter={OtherSelectedFilter}
                />
              </div>

              <div className={Style.right_parentcontainer}>
                <div className={Style.rightside_container}>
                  <div className={Style.top_picks} onClick={handleToggle}>
                    TOP PICKS
                  </div>
                  {(isToggled || !isMobile) && (
                    <div className={Style.popSub}>
                      {Subcategories.slice(0, 5).map((subCat, index) => {
                        return <p key={index} onClick={onClickFun(categoryId,userId)}>{subCat.subcategory}</p>;
                      })}
                    </div>
                  )}

                  <div className={Style.Right_container}>
                    {SortedProducts.length !== 0 ? (
                      <div className={Style.card_container}>
                        {SortedProducts.map((product, key) => {
                          return <ProductCard product={product} key={key} />;
                        })}
                      </div>
                    ) : (
                      <div className={Style.error_container}>
                        <h1>No Product Found</h1>
                      </div>
                    )}
                  </div>
                </div>
                <div className={Style.pagination}>
                  {SortedProducts.length !== 0 ? (
                    <div className={Style.loadbtn}>
                      <button
                        onClick={handlePreviousPage}
                        className={
                          CurrentPage === 0
                            ? `${Style.inactiveBtn}`
                            : `${Style.activeBtn}`
                        }
                        disabled={CurrentPage === 0}
                      >
                        <HiOutlineArrowNarrowLeft className={Style.icon} /> Prev
                      </button>
                      <button
                        onClick={handleNextPage}
                        className={
                          IsLastPage
                            ? `${Style.inactiveBtn}`
                            : `${Style.activeBtn}`
                        }
                        disabled={IsLastPage}
                      >
                        {" "}
                        Next{" "}
                        <HiOutlineArrowNarrowRight className={Style.icon} />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CategoryProductPage;

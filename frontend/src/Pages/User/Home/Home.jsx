import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import Style from "./index.module.css";
import instance from "../../../instance/AxiosInstance";
import Newsletter from "../../../Components/Newsletter/Newsletter";
import HomeProduct from "../../../Components/ProductWrapper/HomeProduct";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import HomeCarousel from "../../../Components/Carousels/HomeCarousel/HomeCarousel";
import LeftCategory from "../../../Components/HomeCategory/LeftCategory";
import RightCategory from "../../../Components/HomeCategory/RightCategory";
import TopCategory from "../../../Components/HomeCategory/TopCategory";

const Home = () => {
  const [location, setLocation] = useState([]);
  const [Products, SetProducts] = useState([]);
  const [SortedProducts, SetSortedProducts] = useState([]);
  const [CurrentPage, SetCurrentPage] = useState(0);
  const [SliderImage, SetSliderImage] = useState([]);
  const [IsLastPage, SetIsLastPage] = useState(false);
  const [catToggle, setCatToggle] = useState(false);
  const [isMounted, setIsMounted] = useState(false);




  // dispaly function for all categories in Top bar
  const changeToggle = () => {
    setCatToggle((prev) => !prev);
  };
  
  //animation to left cat bar

  useEffect(() => {
    if (catToggle) {
      requestAnimationFrame(() => setIsMounted(true));
    } else {
      setIsMounted(false);
    }
  }, [catToggle]);

  const loadProducts = () => {
    try {
      instance
        .get(`/api/user/product/get_products?page=${CurrentPage}`)
        .then((response) => {
          SetProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //LoadCategory functions
  useEffect(() => {
    loadProducts();
  }, [CurrentPage]);

  // function ScrollToTopOnMount() {
  //   window.scrollTo(0, 0);
  //   return null;
  // }

  // useEffect(() => {
  //   ScrollToTopOnMount();
  // }, []);

  //LoadSlider Image functions
  useEffect(() => {
    try {
      instance
        .get("/api/user/slide/slides_view")
        .then((response) => {
          SetSliderImage([...response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  useEffect(() => {
    findPremiumProducts();
  }, [Products]);

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

  return (
    <div className={Style.home_container}>
      {/* <div className={Style.Top_container}>
        <TopCategory togglefunc={setCatToggle} toggleState={catToggle} />
      </div> */}
      {/* <ScrollToTopOnMount /> */}
      <Navbar setLocation={setLocation} location={location} togglefunc={setCatToggle} toggleState={catToggle}/>
      <HomeCarousel items={SliderImage} />
      <div className={Style.Main_container}>
        <div className={Style.Left} style={{display:catToggle ? 'block': 'none'}}>
          {
            catToggle &&
            <div
            className={`${Style.left_cat} ${
              isMounted ? Style.left_catenter : ""
            }`}
          >
            <LeftCategory />
          </div>
          }
         
        </div>

        {/* {
      catToggle &&  
      <div className={Style.Left}>
        <LeftCategory />
      </div> 
     } */}

        <div className={Style.Right}>
          <RightCategory />
          <div className={Style.cardWrapper}>
            <HomeProduct sortedproducts={SortedProducts} />
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
                    IsLastPage ? `${Style.inactiveBtn}` : `${Style.activeBtn}`
                  }
                  disabled={IsLastPage}
                >
                  {" "}
                  Next <HiOutlineArrowNarrowRight className={Style.icon} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;

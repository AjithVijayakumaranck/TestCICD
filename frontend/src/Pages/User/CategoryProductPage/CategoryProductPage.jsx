import React, { useState, useEffect } from 'react'
import Style from "./index.module.css"
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import ProductCard from '../../../Components/Cards/ProductCard/ProductCard';
import instance from '../../../instance/AxiosInstance';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { useParams } from 'react-router-dom';
import ProductFilter from '../../../Components/ProductFilter/ProductFilter';


const CategoryProductPage = () => {

    const location = useLocation();
    const pathSegment = location.pathname.split('/').filter((segment) => segment);


    const { categoryId } = useParams();

    const [Categories, SetCategories] = useState([]);
    const [Products, SetProducts] = useState([]);
    const [CurrentPage, SetCurrentPage] = useState(0);
    const [Subcategory, SetSubcategory] = useState([]);
    const [Filters, SetFilters] = useState([]);

    const [DefaultId, SetDefaultId] = useState(categoryId);
    const [Min, SetMin] = useState('');
    const [Max, SetMax] = useState('');
    const [SubValue, SetSubValue] = useState("");
    const [StateValue, SetStateValue] = useState("");
    const [OtherSelectedFilter, SetOtherSelectedFilter] = useState({});

    const [DistrictValue, SetDistrictValue] = useState("");
    const [SortedProducts, SetSortedProducts] = useState([]);

    const [IsLastPage, SetIsLastPage] = useState(false);


    useEffect(() => {
      instance
        .get(`/api/category/get_SingleCategory?categoryId=${categoryId}`)
        .then((response) => {
          SetCategories(response.data);
          SetSubcategory((prevCat)=>{
          if(prevCat !== response.data?.subcategory){
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


console.log(Subcategory)

    const loadProducts = () => {
        try {
            instance.get(`/api/user/filter/filter_products?category=${categoryId}&min=${Min}&max=${Max}&page=${CurrentPage}
            &state=${StateValue}&subcategory=${SubValue}&district=${DistrictValue}&other=${JSON.stringify(OtherSelectedFilter)}`).then((response) => {
                SetProducts([...response.data]);
            }).catch((error) => {
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
        SetSortedProducts(sortedProducts)
    }

    // -- functions to check that islast page
    useEffect(() => {
        try {
            instance.get(`/api/user/product/check_lastpage?page=${CurrentPage}`).then((response) => {
                SetIsLastPage(response?.data?.lastPage)
            }).catch((error) => {
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
    }, [CurrentPage, Min, Max, SubValue, StateValue, DistrictValue, OtherSelectedFilter, categoryId, DefaultId]);


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
        SetOtherSelectedFilter("")
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
        SetOtherSelectedFilter({ ...OtherSelectedFilter, ...value })
    }

    function ScrollToTopOnMount() {
        window.scrollTo(0, 0);
        return null;
    }

    useEffect(() => {
        ScrollToTopOnMount();
    }, []);

    return (
        <div className={Style.page_wrapper}>
            <ScrollToTopOnMount />
            <Navbar />
            <div className={Style.main}>
                <Breadcrumb customName={Categories?.categoryName} pathSegments={pathSegment} />
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

                            <div className={Style.Right_container}>

                                {SortedProducts.length !== 0 ?
                                    <div className={Style.card_container}>
                                        {SortedProducts.map((product) => {
                                            return (
                                                <ProductCard product={product} />
                                            )
                                        })}
                                    </div>
                                    :
                                    <div className={Style.error_container}>
                                        <h1>No Product Found</h1>
                                    </div>
                                }

                                {SortedProducts.length !== 0 ?
                                    <div className={Style.loadbtn}>
                                        <button
                                            onClick={handlePreviousPage}
                                            className={CurrentPage === 0 ? `${Style.inactiveBtn}` : `${Style.activeBtn}`}
                                            disabled={CurrentPage === 0} >
                                            <HiOutlineArrowNarrowLeft className={Style.icon} /> Prev
                                        </button>
                                        <button
                                            onClick={handleNextPage}
                                            className={IsLastPage ? `${Style.inactiveBtn}` : `${Style.activeBtn}`}
                                            disabled={IsLastPage} > Next <HiOutlineArrowNarrowRight className={Style.icon} />
                                        </button>
                                    </div>
                                    : null
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default CategoryProductPage
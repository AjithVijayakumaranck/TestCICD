import React, { useState, useEffect, useContext } from 'react'
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

    const { categoryId } = useParams()

    const [Categories, SetCategories] = useState([]);
    const [Products, SetProducts] = useState([]);
    const [CurrentPage, SetCurrentPage] = useState(0);
    const [Subcategory, SetSubcategory] = useState([]);
    const [Filters, SetFilters] = useState([]);

    const [CatId, SetCatId] = useState(categoryId);
    const [Min, SetMin] = useState('');
    const [Max, SetMax] = useState('');
    const [SubValue, SetSubValue] = useState("");
    const [StateValue, SetStateValue] = useState("");
    const [OtherSelectedFilter, SetOtherSelectedFilter] = useState({});

    const [DistrictValue, SetDistrictValue] = useState("");
    const [SortedProducts, SetSortedProducts] = useState([]);

    //Scroll to top
    function ScrollToTopOnMount() {
        window.scrollTo(0, 0);
        return null;
    }

    //Call Scroll To Top 
    useEffect(() => {
        ScrollToTopOnMount();
    }, []);

    //Get the Category Details
    useEffect(() => {
        instance.get(`/api/category/get_SingleCategory?categoryId=${categoryId}`).then((response) => {
            SetCategories(response.data);
            SetSubcategory(response.data?.subcategory);
            SetFilters(response.data?.filters);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    const loadProducts = () => {
        try {
            instance.get(`/api/user/filter/filter_products?category=${CatId}&min=${Min}&max=${Max}&page=${CurrentPage}
            &state=${StateValue}&subcategory=${SubValue}&district=${DistrictValue}&other=${OtherSelectedFilter}`).then((response) => {
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

    useEffect(() => {
        findPremiumProducts();
    }, [Products]);


    //LoadCategory functions
    useEffect(() => {
        loadProducts();
    }, [CurrentPage, Min, Max, SubValue, StateValue, DistrictValue, categoryId, CatId]);


    const handlePreviousPage = () => {
        if (CurrentPage > 1) {
            SetCurrentPage(CurrentPage - 12);
        }
    };

    const handleNextPage = () => {
        SetCurrentPage(CurrentPage + 12);
    };

    const HandleDefault = () => {
        SetCatId(categoryId);
        SetMax("");
        SetMin("");
        SetSubValue("");
        SetStateValue("");
        SetDistrictValue("");
        loadProducts();
    };

    const HandleMin = (value) => {
        SetMin(value);
        loadProducts();
    };

    const HandleMax = (value) => {
        SetMax(value);
        loadProducts();
    };

    const HandleSubcategory = (value) => {
        SetSubValue(value);
        loadProducts();
    };

    const HandleState = (value) => {
        SetStateValue(value);
        loadProducts();
    };

    const HandleOtherFilter = (value) => {
        SetOtherSelectedFilter({ ...OtherSelectedFilter, ...value })
    }

    const HandleDistrict = (value) => {
        SetDistrictValue(value);
        loadProducts();
    };




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
                                        {/* <img src="/Images/No-data.svg" alt="" /> */}
                                        <h1>No Product Found</h1>
                                    </div>
                                }

                                {SortedProducts.length !== 0 ?
                                    <div className={Style.loadbtn}>
                                        <button onClick={handlePreviousPage} disabled={CurrentPage === 1} >  <HiOutlineArrowNarrowLeft className={Style.icon} /> Prev </button>
                                        <button onClick={handleNextPage}  > Next <HiOutlineArrowNarrowRight className={Style.icon} /> </button>
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
import React, { useEffect, useState } from 'react'
import Style from './index.module.css'
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import instance from '../../../instance/AxiosInstance'
import Navbar from '../../../Components/Navbar/Navbar'
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb'
import Footer from '../../../Components/Footer/Footer'
import { useLocation } from 'react-router-dom'
import ProductCard from '../../../Components/Cards/ProductCard/ProductCard'




const SearchProductsPage = () => {

    const [Products, SetProducts] = useState([]);
    const [CurrentPage, SetCurrentPage] = useState(0);
    const [SortedProducts, SetSortedProducts] = useState([]);
    const [IsLastPage, SetIsLastPage] = useState(false);

    function ScrollToTopOnMount() {
        window.scrollTo(0, 0);
        return null;
    }

    useEffect(() => {
        ScrollToTopOnMount();
    }, []);


    const loadProducts = () => {
        try {
            instance.get(`/api/user/product/get_products?page=${CurrentPage}`).then((response) => {
                SetProducts([...response.data]);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

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

    //LoadCategory functions
    useEffect(() => {
        loadProducts();
    }, [CurrentPage]);

    // -- Function to find premium product
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

    const location = useLocation();
    const pathSegment = location.pathname.split('/').filter((segment) => segment);

    return (
        <div className={Style.page_wrapper}>
            <ScrollToTopOnMount />
            <Navbar />
            <div className={Style.main}>
                <Breadcrumb pathSegments={pathSegment} />
                <div className={Style.Wrapper}>
                    <div className={Style.productwrapper}>
                        <div className={Style.container}>
                            <div className={Style.heading}>
                                <div className={Style.left}>
                                    <h2>Search Products</h2>
                                </div>
                            </div>
                            <div className={Style.cardWrapper}>
                                {SortedProducts.map((card, index) => {
                                    return (
                                        <ProductCard key={index} product={card} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
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
                <Footer />
            </div>
        </div>
    )
}

export default SearchProductsPage
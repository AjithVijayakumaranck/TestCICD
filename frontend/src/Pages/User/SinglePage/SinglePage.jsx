import React, { useEffect, useState } from 'react'
import Style from './index.module.css'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import ProductDetail from '../../../Components/ProductSinglePage/ProductDetail'
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb'
import { useLocation, useParams } from 'react-router-dom'
import PageProduct from '../../../Components/PageProducts/PageProduct'
import instance from '../../../instance/AxiosInstance'
import Newsletter from '../../../Components/Newsletter/Newsletter'



const SinglePage = () => {

    const { productId } = useParams();


    const [ProductData, SetProductData] = useState({})
    const [CategoryProducts, SetCategoryProducts] = useState([]);
    const [SortedProducts, SetSortedProducts] = useState([]);
    const [ProductDetails, SetProductDetails] = useState({})
    const [ProductImg, SetProductImg] = useState([])
    const [OtherDetails, SetOtherDetails] = useState({})
    const [ClientDetails, SetClientDetails] = useState({})
    const [ClientImg, SetClientImg] = useState("");
    const [ReviewsData, SetReviewsData] = useState([]);

    //Finding Product Details
    useEffect(() => {
        try {
            instance.get(`/api/user/product/get_singleproduct?productId=${productId}`).then((response) => {
                SetProductData({ ...response.data });
                SetProductDetails({ ...response.data });
                SetOtherDetails({ ...response.data.otherDetails });
                SetProductImg([...response.data.images]);
                SetClientDetails({ ...response.data?.userId })
                SetClientImg(response.data?.userId?.profilePicture?.url);
                SetReviewsData(response.data?.userId?.ratings)
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }, [productId])

    //Finding Category Products
    useEffect(() => {
        try {
            instance.get(`/api/user/filter/filter_products?category=${ProductData?.category}`).then((response) => {
                SetCategoryProducts([...response.data]);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }, [ProductData])

    //Sort priemum Products
    useEffect(() => {
        try {
            const sortedProducts = CategoryProducts.sort((a, b) => {
                if (a.featured && !b.featured) {
                    return -1;
                } else if (!a.featured && b.featured) {
                    return 1;
                }
                return 0;
            });
            SetSortedProducts(sortedProducts)
        } catch (error) {
            console.log(error);
        }
    }, [CategoryProducts]);

    const ExcludeProducts = SortedProducts.filter((product) => product._id !== productId).slice(0, 4);
  

    //Scroll to Top function
    function ScrollToTopOnMount() {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

        return null;
    }

    const location = useLocation();
    const pathSegment = location.pathname.split('/').filter((segment) => segment);


    return (
        <div className={Style.page_wrapper}>
            <ScrollToTopOnMount />
            <Navbar />
            <div className={Style.main}>
                <Breadcrumb customName="Details" pathSegments={pathSegment} />
                <ProductDetail ProductDet={ProductDetails} ProductImages={ProductImg} OtherDet={OtherDetails} ClientData={ClientDetails} ClientImage={ClientImg} Reviews={ReviewsData} />
                {ExcludeProducts.length > 0 ?
                    <PageProduct title="You May Also Like" sortedproducts={ExcludeProducts} categoryId={ProductData?.category} />
                    : null
                }
                <Newsletter />
                <Footer />
            </div>
        </div>
    )
}

export default SinglePage

import React, { useState, useEffect, useContext } from 'react'
import Style from './Style.module.css'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import adminInstance from '../../../instance/AdminInstance';
import { AdminContext } from '../../../Contexts/AdminContext';


const Widgets = ({ type }) => {

    const LoggedInAdmin = useContext(AdminContext);
    const { Admin, SetAdmin } = LoggedInAdmin

    const [Products, SetProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [Users, SetUsers] = useState([]);

    const loadUsers = () => {
        try {
            adminInstance.get("/api/super_admin/user_control/get_allprofile").then((response) => {
                SetUsers([...response.data]);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };


    const loadcategory = () => {
        try {
            adminInstance.get("/api/super_admin/category/get_categories").then((response) => {
                setCategories([...response.data]);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const loadProducts = () => {
        try {
            adminInstance.get("/api/super_admin/product_control/get_products").then((response) => {
                SetProducts([...response.data]);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const TotalUser = Users.length
    const TotalCategory = categories.length
    const TotalProduct = Products.length


    //LoadCategory functions
    useEffect(() => {
        loadUsers();
        loadcategory();
        loadProducts();
    }, [Admin]);



    let data;

    //Temporary

    const diff = 20

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                number: TotalUser,
                link: "See all users",
                icon: <PersonOutlineOutlinedIcon className={Style.icon} />,
            };
            break;
        case "product":
            data = {
                title: "PRODUCTS",
                isMoney: false,
                number: TotalProduct,
                link: "See all products",
                icon: <Inventory2OutlinedIcon className={Style.icon} />,
            };
            break;
        case "category":
            data = {
                title: "CATEGORY",
                isMoney: false,
                number: TotalCategory,
                link: "See all subscribers",
                icon: <PersonOutlineOutlinedIcon className={Style.icon} />,
            };
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                number: 1000,
                link: "See all earnings",
                icon: <AttachMoneyOutlinedIcon className={Style.icon} />,
            };
            break;
        default: break;
    }

    return (
        <div className={Style.widgets}>
            <div className={Style.left}>
                <div className={Style.title}>{data.title}</div>
                <div className={Style.counter}> {data.isMoney && "$"} {data.number} </div>
                <div className={Style.link}> {data.link} </div>
            </div>
            <div className={Style.right}>
                <div className={Style.percentage} >
                    <KeyboardArrowUpOutlinedIcon />
                    {diff} %
                </div>
                {data.icon}
            </div>

        </div>
    )
}

export default Widgets
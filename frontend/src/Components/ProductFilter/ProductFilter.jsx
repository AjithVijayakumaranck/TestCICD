import React, { useEffect, useState } from 'react'
import Style from './index.module.css'
import { FaFilter } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import instance from '../../instance/AxiosInstance';
import Select from "react-select";



const ProductFilter = ({ load, FilterOptions, Subcategories, onChangeSubcategory, onMin, onMax, onState, onDistrict, otherSelectedFilter }) => {


    const [CategoryToggle, SetCategoryToggle] = useState(true)
    const [LocationToggle, SetLocationToggle] = useState(true)

    const [States, SetStates] = useState([]);
    const [District, SetDistrict] = useState([])

    const [selectedOption, setSelectedOption] = useState({});
    const [filterCollection, setFilterCollection] = useState({});

    const [filterBySubcategory, setFilterBySubcategory] = useState(null);
    const [filterByState, setFilterByState] = useState(null);
    const [filterByDistrict, setFilterByDistrict] = useState(null);
    const [filterByMinPrice, setFilterByMinPrice] = useState(null);
    const [filterByMaxPrice, setFilterByMaxPrice] = useState(null);

    const subcategoryOptions = Subcategories ? Subcategories.map((data) => ({
        value: data._id,
        label: data.subcategory
    })) : [];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '1px solid #ccc' : state.isSelected ? '1px solid #ccc' : '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: state.isFocused ? '0 0 0 1px #ccc' : null,
            '&:hover': {
                border: '1px solid #ccc', // Remove border on hover
            },
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px solid #ccc', // Example border for options
            backgroundColor: state.isSelected ? '#2684FF' : provided.backgroundColor,
            color: state.isSelected ? 'white' : provided.color,
        }),
    };

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
    }, []);

    const StateOptions = States.map((state) => ({
        value: state.state_id,
        label: state.state_name
    }));

    useEffect(() => {
        try {
            instance.get(`/api/user/filter/search_state?districtCode=${filterByState?.value}`).then((response) => {
                SetDistrict(response.data.districts)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }, [filterByState]);

    const DistrictOptions = District ? District.map((data) => ({
        value: data.district_id,
        label: data.district_name
    })) : [];

    //Handle Price Filter 
    const HandlePriceFilter = (e) => {
        e.preventDefault()
        if (filterByMinPrice !== "") {
            onMin(filterByMinPrice)
            setFilterCollection({ ...filterCollection, filterByMinPrice });
        }
        if (filterByMaxPrice !== "") {
            onMax(filterByMaxPrice)
            setFilterCollection({ ...filterCollection, filterByMaxPrice });
        }
    };

    const HandleInputSearch = (e) => {
        e.preventDefault()
        otherSelectedFilter(selectedOption)
        setFilterCollection({ ...filterCollection, ...selectedOption });
    }

    const HandleClearAll = (e) => {
        e.preventDefault();
        setSelectedOption('');
        setFilterBySubcategory(null);
        setFilterByMinPrice('');
        setFilterByMaxPrice('');
        setFilterByState(null);
        setFilterByDistrict(null);
        setFilterCollection({});
        load();
    }

    return (
        <div className={Style.Container}>

            <div className={Style.top}>
                <div className={Style.filterDiv}>
                    <div className={Style.headingDiv}>
                        <FaFilter className={Style.icon} />
                        <h3>Filter</h3>
                    </div>
                    <div className={Style.clearDiv} onClick={(e) => HandleClearAll(e)}>
                        <span>Clear All</span>
                    </div>
                </div>

                {filterCollection &&
                    <div className={Style.selectedFilterDiv}>
                        {Object.entries(filterCollection).map(([key, value]) => {
                            return (
                                <div className={Style.wrap} key={key}>
                                    <h5> {value} </h5>
                                </div>
                            )
                        })}
                    </div>
                }

            </div>

            <div className={Style.bottom}>
                <div className={Style.accordion}>

                    <div className={Style.accordion_item}>
                        <div className={Style.titleDiv} onClick={() => SetCategoryToggle(!CategoryToggle)}>
                            <h3>Category</h3>
                            <span>{CategoryToggle ? <AiOutlineMinus /> : <AiOutlinePlus />} </span>
                        </div>
                        <div className={CategoryToggle === true ? Style.show : Style.content} >
                            <div className={Style.items} >
                                {subcategoryOptions.map((Data, index) => {
                                    return (
                                        <div className={Style.radioField_wrapper} key={index} >
                                            <input
                                                type="radio"
                                                name="Category"
                                                id={Data.label}
                                                value={Data.value}
                                                checked={filterBySubcategory === Data.value}
                                                onChange={(e) => {
                                                    setFilterBySubcategory(e.target.value);
                                                    onChangeSubcategory(e.target.value);
                                                    setFilterCollection({ ...filterCollection, ['Category']: Data.label });
                                                }}
                                            />
                                            <label htmlFor={Data.label}>{Data.label}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className={Style.accordion_item}>
                        <div className={Style.titleDiv} onClick={() => SetLocationToggle(!LocationToggle)}>
                            <h3>Location</h3>
                            <span>{LocationToggle ? <AiOutlineMinus /> : <AiOutlinePlus />} </span>
                        </div>
                        <div className={LocationToggle === true ? Style.show : Style.content} >
                            <div className={Style.onSelectField} >
                                <div className={Style.items_wrapper} >
                                    <div className={Style.item_Title} >
                                        <h3>State</h3>
                                    </div>
                                    <Select
                                        options={StateOptions}
                                        value={filterByState ? { value: filterByState?.value, label: filterByState?.label } : null}
                                        onChange={(e) => {
                                            setFilterByState(e);
                                            onState(e.label);
                                            setFilterCollection({ ...filterCollection, ['State']: e.label });
                                        }}
                                        styles={customStyles}
                                    />
                                </div>
                                <div className={Style.items_wrapper} >
                                    <div className={Style.item_Title} >
                                        <h3>District</h3>
                                    </div>
                                    <Select
                                        options={DistrictOptions}
                                        value={filterByDistrict ? { value: filterByDistrict?.value, label: filterByDistrict?.label } : null}
                                        onChange={(e) => {
                                            setFilterByDistrict(e);
                                            onDistrict(e.label);
                                            setFilterCollection({ ...filterCollection, ['District']: e.label });
                                        }}
                                        styles={customStyles}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={Style.accordion_item}>
                        <div className={Style.titleDiv}>
                            <h3>Price Range</h3>
                        </div>
                        <div className={Style.inputContent} >
                            <div className={Style.inputFields} >
                                <div className={Style.field_wrapper} >
                                    <input
                                        type="number"
                                        placeholder='min'
                                        value={filterByMinPrice}
                                        onChange={(e) => setFilterByMinPrice(e.target.value)}
                                    />
                                </div>
                                <div className={Style.seperation}>-</div>
                                <div className={Style.field_wrapper} >
                                    <input
                                        type="number"
                                        placeholder='max'
                                        value={filterByMaxPrice}
                                        onChange={(e) => setFilterByMaxPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={Style.searchBtn}>
                                <button onClick={(e) => { HandlePriceFilter(e) }}>Search</button>
                            </div>
                        </div>
                    </div>

                    {FilterOptions.map((FilterData, index) => {
                        if (FilterData.type === "text") {
                            return (
                                <div className={Style.accordion_item} key={index}>
                                    <div className={Style.titleDiv}>
                                        <h3>{FilterData.label}</h3>
                                    </div>
                                    <div className={Style.inputContent} >
                                        <div className={Style.inputFields} >
                                            <div className={Style.field_wrapper} >
                                                <input
                                                    type={FilterData.type}
                                                    name={FilterData.label}
                                                    placeholder={FilterData.label.toLowerCase()}
                                                    value={selectedOption[FilterData.label] || ''}
                                                    onChange={(e) => {
                                                        setSelectedOption({ ...selectedOption, [FilterData.label]: e.target.value })
                                                    }}
                                                />
                                            </div>
                                            <div className={Style.field_searchBtn}>
                                                <button onClick={(e) => { HandleInputSearch(e) }}> <FiSearch /> </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}

                    {FilterOptions.map((FilterData, index) => {
                        if (FilterData.type === "radio") {
                            return (
                                <div className={Style.accordion_item} key={index}>
                                    <div className={Style.titleDiv}>
                                        <h3>{FilterData.label}</h3>
                                    </div>
                                    <div className={Style.inputContent} >
                                        <div className={Style.radioFields} >
                                            {FilterData.options.map((Data, index) => {
                                                return (
                                                    <div className={Style.radioField_wrapper} key={index}>
                                                        <input
                                                            type="radio"
                                                            id={Data}
                                                            name={FilterData.label}
                                                            value={Data}
                                                            checked={selectedOption[FilterData.label] === Data}
                                                            onChange={(e) => {
                                                                setSelectedOption({ ...selectedOption, [FilterData.label]: e.target.value });
                                                                otherSelectedFilter({ [FilterData.label]: e.target.value });
                                                                setFilterCollection({ ...filterCollection, [FilterData.label]: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor={Data}>{Data}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}

                </div>
            </div>
        </div>
    )
}

export default ProductFilter





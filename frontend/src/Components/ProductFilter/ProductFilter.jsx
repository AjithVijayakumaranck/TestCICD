import React, { useEffect, useState } from "react";
import Style from "./index.module.css";
import { FaFilter } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import instance from "../../instance/AxiosInstance";
import Select from "react-select";
import Tooltip from "@mui/material/Tooltip";

const ProductFilter = ({
  nestSelected,
  setSelectedNest,
  OtherSelectedFilter,
  load,
  FilterOptions,
  Subcategories,
  onChangeSubcategory,
  onMin,
  onMax,
  onState,
  onDistrict,
  otherSelectedFilter,
  nestedCategories,
  setNestedCategories,
  selectedSubcategory,
  onSubcategoryChange,
  setFilterBySubcategory,
  filterBySubcategory
}) => {
  const [CategoryToggle, SetCategoryToggle] = useState(true);
  const [NestedCategoryToggle, SetNestedCategoryToggle] = useState(true);
  const [LocationToggle, SetLocationToggle] = useState(true);
  const [States, SetStates] = useState([]);
  const [District, SetDistrict] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [filterCollection, setFilterCollection] = useState({});
  const [tooltipText, setTooltipText] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  // const [filterBySubcategory, setFilterBySubcategory] = useState(null);
  const [filterByState, setFilterByState] = useState(null);
  const [filterByDistrict, setFilterByDistrict] = useState(null);
  const [filterByMinPrice, setFilterByMinPrice] = useState(null);
  const [filterByMaxPrice, setFilterByMaxPrice] = useState(null);
  const [selectedNestedCategory, setSelectedNestedCategory] = useState(null);
  const [filterByNestedCategory, setFilterByNestedCategory] = useState(null);

  const subcategoryOptions = Subcategories
    ? Subcategories.map((data) => ({
        value: data._id,
        label: data.subcategory,
      }))
    : [];
console.log();
  // Fetching single subcategory for adding nested cat input
  useEffect(() => {
    if (filterBySubcategory) {
      instance
        .get(
          `/api/category/get_singlesubcategory?subCategoryId=${filterBySubcategory}`
        )
        .then((response) => {
          const nestedCategory = response.data?.nestedCategories || [];
          setNestedCategories(nestedCategory);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filterBySubcategory]);

  // Function to handle nested category change
  const handleNestedCategoryChange = (e) => {
    console.log(e.target.value,"hhhhs");
    setSelectedNest(e.target.value)
    // setSelectedNestedCategory(e.value);
    // setFilterByNestedCategory(e.value);
    setFilterCollection({
      ...filterCollection,
      ["NestedCategory"]: e.label,
    });
  };

  const nestedCategoryOptions = nestedCategories.map((data) => ({
    value: data._id,
    label: data.nestedCat,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border:
        state.isFocused || state.isSelected
          ? "1px solid #ccc"
          : "1px solid #ccc",
      borderRadius: "4px",
      boxShadow: state.isFocused ? "0 0 0 1px #ccc" : null,
      "&:hover": {
        border: "1px solid #ccc", // Remove border on hover
      },
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid #ccc", // Example border for options
      backgroundColor: state.isSelected ? "#2684FF" : provided.backgroundColor,
      color: state.isSelected ? "white" : provided.color,
    }),
  };

  // Location Fetching
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

  useEffect(() => {
    try {
      instance
        .get(
          `/api/user/filter/search_state?districtCode=${filterByState?.value}`
        )
        .then((response) => {
          SetDistrict(response.data.districts);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [filterByState]);

  const DistrictOptions = District
    ? District.map((data) => ({
        value: data.district_id,
        label: data.district_name,
      }))
    : [];

  // Handle Price Filter
  const HandlePriceFilter = (e) => {
    e.preventDefault();

    const minPrice = filterByMinPrice !== "" ? filterByMinPrice : "";
    const maxPrice = filterByMaxPrice !== "" ? filterByMaxPrice : "";

    onMin(minPrice);
    onMax(maxPrice);
    setFilterCollection({ ...filterCollection, minPrice, maxPrice });
  };

  const HandleInputSearch = (e) => {
    e.preventDefault();
    otherSelectedFilter(selectedOption);
    setFilterCollection({ ...filterCollection, ...selectedOption });
  };

  const HandleRangeSearch = (e, label, rangeMax) => {
    e.preventDefault();

    // Check if minValue and maxValue are null, set them to 0 by default
    const min = minValue !== "" ? minValue : 0;
    const max = maxValue !== "" ? maxValue : parseInt(rangeMax);

    const rangeValue = `${min} - ${max}`;

    if (filterCollection[label] !== undefined) {
      // If data exists, set it to null
      setFilterCollection((prevFilterCollection) => ({
        ...prevFilterCollection,
        [label]: null,
      }));
    }

    const filterCollectionData = {
      [label]: rangeValue,
    };

    const rangeData = {
      [label]: {
        min: min,
        max: max,
      },
    };

    otherSelectedFilter(rangeData);
    setFilterCollection((prevFilterCollection) => ({
      ...prevFilterCollection,
      ...filterCollectionData,
    }));
    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      ...filterCollectionData,
    }));
  };

  const HandleClearAll = (e) => {
    e.preventDefault();
    setSelectedOption({});
    setFilterBySubcategory(null);
    setFilterByMinPrice("");
    setFilterByMaxPrice("");
    setFilterByState(null);
    setFilterByDistrict(null);
    setFilterCollection({});
    setMinValue("");
    setMaxValue("");
    setNestedCategories([]);
    load();
  };

  const handlecategoryToggle = () => {
    SetCategoryToggle(!CategoryToggle);
    SetNestedCategoryToggle(!NestedCategoryToggle);
  };
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

        {Object.entries(filterCollection).length !== 0 && (
          <div className={Style.selectedFilterDiv}>
            {Object.entries(filterCollection).map(([key, value]) => {
              return (
                <div className={Style.wrap} key={key}>
                  <h5> {value} </h5>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={Style.bottom}>
        <div className={Style.accordion}>
          <div className={Style.accordion_item}>
            <div className={Style.titleDiv} onClick={handlecategoryToggle}>
              <h3 style={{fontWeight:'inherit',color:'black'}}>SubCategory</h3>
              <span>
                {CategoryToggle ? <AiOutlineMinus /> : <AiOutlinePlus />}{" "}
              </span>
            </div>
            <div
              className={CategoryToggle === true ? Style.show : Style.content}
            >
              <div className={Style.items}>
                {subcategoryOptions.map((Data, index) => {
                  return (
                    <div className={Style.radioField_wrapper} key={index}>
                      <input
                        type="radio"
                        name="Category"
                        id={Data.label}
                        value={Data.value}
                        checked={filterBySubcategory === Data.value}
                        onChange={(e) => {
                          setFilterBySubcategory(e.target.value);
                          onChangeSubcategory(e.target.value);
                          setFilterCollection({
                            ...filterCollection,
                            ["Category"]: Data.label,
                          });
                        }}
                      />
                      <label htmlFor={Data.label}>{Data.label}</label>
                    </div>
                  );
                })}
              </div>
            </div>

            
              <div className={Style.items}>
              {filterBySubcategory &&  nestedCategories.length > 0 && (
              <div className={Style.nestedCategoryContainer} style={{backgroundColor:'white',paddingInline:'10px',gap:'10px'}} >
                <h4 style={{fontWeight:'inherit',color:'black'}}>Nested Categories</h4>
                {nestedCategories.map((nestedData, nestedIndex) => {
                  return (
                    <div className={Style.radioField_wrapper} key={nestedIndex} style={{padding:'5px'}}>
                      <input
                        type="radio"
                        name="NestedCategory"
                        id={nestedData._id}
                        value={nestedData._id}
                        checked={nestSelected === nestedData._id}
                        onChange={handleNestedCategoryChange}
                        
                      />
                      <label htmlFor={nestedData.nestedCat}>
                        {nestedData.nestedCat}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
            </div>
          </div>

          <div className={Style.accordion_item}>
            <div
              className={Style.titleDiv}
              onClick={() => SetLocationToggle(!LocationToggle)}
            >
              <h3>Location</h3>
              <span>
                {LocationToggle ? <AiOutlineMinus /> : <AiOutlinePlus />}{" "}
              </span>
            </div>
            <div
              className={LocationToggle === true ? Style.show : Style.content}
            >
              <div className={Style.onSelectField}>
                <div className={Style.items_wrapper}>
                  <div className={Style.item_Title}>
                    <h3>State</h3>
                  </div>
                  <Select
                    options={StateOptions}
                    value={
                      filterByState
                        ? {
                            value: filterByState?.value,
                            label: filterByState?.label,
                          }
                        : null
                    }
                    onChange={(e) => {
                      setFilterByState(e);
                      onState(e.label);
                      setFilterCollection({
                        ...filterCollection,
                        ["State"]: e.label,
                      });
                    }}
                    styles={customStyles}
                  />
                </div>
                <div className={Style.items_wrapper}>
                  <div className={Style.item_Title}>
                    <h3>District</h3>
                  </div>
                  <Select
                    options={DistrictOptions}
                    value={
                      filterByDistrict
                        ? {
                            value: filterByDistrict?.value,
                            label: filterByDistrict?.label,
                          }
                        : null
                    }
                    onChange={(e) => {
                      setFilterByDistrict(e);
                      onDistrict(e.label);
                      setFilterCollection({
                        ...filterCollection,
                        ["District"]: e.label,
                      });
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
            <div className={Style.inputContent}>
              <div className={Style.inputFields}>
                <div className={Style.field_wrapper}>
                  <input
                    type="number"
                    placeholder="min"
                    value={filterByMinPrice}
                    onChange={(e) => setFilterByMinPrice(e.target.value)}
                  />
                </div>
                <div className={Style.seperation}>-</div>
                <div className={Style.field_wrapper}>
                  <input
                    type="number"
                    placeholder="max"
                    value={filterByMaxPrice}
                    onChange={(e) => setFilterByMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className={Style.searchBtn}>
                <button
                  onClick={(e) => {
                    HandlePriceFilter(e);
                  }}
                >
                  Search
                </button>
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
                  <div className={Style.inputContent}>
                    <div className={Style.inputFields}>
                      <div className={Style.field_wrapper}>
                        <input
                          type={FilterData.type}
                          name={FilterData.label}
                          placeholder={FilterData.label.toLowerCase()}
                          value={selectedOption[FilterData.label] || ""}
                          onChange={(e) => {
                            setSelectedOption({
                              ...selectedOption,
                              [FilterData.label]: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className={Style.field_searchBtn}>
                        <button
                          onClick={(e) => {
                            HandleInputSearch(e);
                          }}
                        >
                          {" "}
                          <FiSearch />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}

          {FilterOptions.map((FilterData, index) => {
            if (FilterData.type === "checkbox") {
              return (
                <div className={Style.accordion_item} key={index}>
                  <div className={Style.titleDiv}>
                    <h3>{FilterData.label}</h3>
                  </div>
                  <div className={Style.inputContent}>
                    <div className={Style.radioFields}>
                      {FilterData.options.map((Data, index) => {
                        return (
                          <div className={Style.radioField_wrapper} key={index}>
                            <input
                              type="checkbox"
                              id={Data}
                              name={FilterData.label}
                              value={Data}
                              checked={selectedOption[Data] === Data}
                              onChange={(e) => {
                                const selectedValues = e.target.value;
                                const isSelected = e.target.checked;

                                setSelectedOption((prevSelectedOption) => {
                                  const updatedCollection = {
                                    ...prevSelectedOption,
                                  };
                                  if (isSelected) {
                                    updatedCollection[selectedValues] =
                                      selectedValues;
                                  } else {
                                    delete updatedCollection[selectedValues];
                                  }
                                  return updatedCollection;
                                });

                                otherSelectedFilter({
                                  [FilterData.label]: isSelected
                                    ? [
                                        ...(OtherSelectedFilter[
                                          FilterData.label
                                        ] || []),
                                        selectedValues,
                                      ]
                                    : (
                                        OtherSelectedFilter[FilterData.label] ||
                                        []
                                      ).filter(
                                        (checkedValue) =>
                                          checkedValue !== selectedValues
                                      ),
                                });

                                setFilterCollection((prevFilterCollection) => {
                                  const updatedCollection = {
                                    ...prevFilterCollection,
                                  };
                                  if (isSelected) {
                                    updatedCollection[selectedValues] =
                                      selectedValues;
                                  } else {
                                    delete updatedCollection[selectedValues];
                                  }
                                  return updatedCollection;
                                });
                              }}
                            />
                            <label htmlFor={Data}>{Data}</label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          })}

          {FilterOptions.map((FilterData, index) => {
            if (FilterData.type === "radio") {
              return (
                <div className={Style.accordion_item} key={index}>
                  <div className={Style.titleDiv}>
                    <h3>{FilterData.label}</h3>
                  </div>
                  <div className={Style.inputContent}>
                    <div className={Style.radioFields}>
                      {FilterData.options.map((Data, index) => {
                        return (
                          <div className={Style.radioField_wrapper} key={index}>
                            <input
                              type="radio"
                              id={Data}
                              name={FilterData.label}
                              value={Data}
                              checked={
                                selectedOption[FilterData.label] === Data
                              }
                              onChange={(e) => {
                                setSelectedOption({
                                  ...selectedOption,
                                  [FilterData.label]: e.target.value,
                                });
                                otherSelectedFilter({
                                  [FilterData.label]: e.target.value,
                                });
                                setFilterCollection({
                                  ...filterCollection,
                                  [FilterData.label]: e.target.value,
                                });
                              }}
                            />
                            <label htmlFor={Data}>{Data}</label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          })}

          {FilterOptions.map((FilterData, index) => {
            if (FilterData.type === "range") {
              return (
                <div className={Style.accordion_item} key={index}>
                  <div className={Style.titleDiv}>
                    <h3>{FilterData.label}</h3>
                  </div>
                  <div className={Style.inputContent}>
                    <div className={Style.radioFields}>
                      {FilterData.options.map(
                        ([DataLabel, DataOption], index) => {
                          return (
                            <div
                              className={Style.radioField_wrapper}
                              key={index}
                            >
                              <input
                                type="radio"
                                id={DataLabel}
                                name={FilterData.label}
                                value={DataLabel}
                                checked={
                                  selectedOption[FilterData.label] === DataLabel
                                }
                                onChange={(e) => {
                                  setSelectedOption({
                                    ...selectedOption,
                                    [FilterData.label]: e.target.value,
                                  });
                                  otherSelectedFilter({
                                    [FilterData.label]: DataOption,
                                  });
                                  setFilterCollection({
                                    ...filterCollection,
                                    [FilterData.label]: e.target.value,
                                  });
                                }}
                              />
                              <label htmlFor={DataLabel}>{DataLabel}</label>
                            </div>
                          );
                        }
                      )}
                    </div>
                    <div className={Style.slider_wrapper}>
                      <p>Choose Range From Between</p>
                      <div className={Style.slider_label}>
                        <span>
                          {minValue !== ""
                            ? minValue
                            : FilterData.defaultMinValue}
                        </span>
                        <span>
                          {maxValue !== ""
                            ? maxValue
                            : FilterData.defaultMaxValue}
                        </span>
                      </div>
                      <Tooltip title={tooltipText}>
                        <div className={Style.slider}>
                          <div className={Style.progress_wrap}>
                            <div className={Style.progress}> </div>
                          </div>
                          <div className={Style.rangeInput}>
                            <input
                              type="range"
                              className={Style.range_min}
                              min={FilterData.defaultMinValue}
                              max={FilterData.defaultMaxValue}
                              step={FilterData.stepValue}
                              value={
                                minValue !== ""
                                  ? minValue
                                  : parseInt(FilterData.defaultMinValue)
                              }
                              onChange={(e) =>
                                setMinValue(e.target.value.toString())
                              }
                              onMouseMove={(e) =>
                                setTooltipText(`Min Value: ${e.target.value}`)
                              }
                              onMouseOut={() => setTooltipText("")}
                            />
                            <input
                              type="range"
                              className={Style.range_max}
                              min={FilterData.defaultMinValue}
                              max={FilterData.defaultMaxValue}
                              step={FilterData.stepValue}
                              value={
                                maxValue !== ""
                                  ? maxValue
                                  : parseInt(FilterData.defaultMaxValue)
                              }
                              onChange={(e) =>
                                setMaxValue(e.target.value.toString())
                              }
                              onMouseMove={(e) =>
                                setTooltipText(`Max Value: ${e.target.value}`)
                              }
                              onMouseOut={() => setTooltipText("")}
                            />
                          </div>
                        </div>
                      </Tooltip>
                      <div className={Style.range_searchBtn}>
                        <button
                          onClick={(e) => {
                            HandleRangeSearch(
                              e,
                              FilterData.label,
                              FilterData.defaultMaxValue
                            );
                          }}
                        >
                          {" "}
                          Apply{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

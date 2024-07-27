import React, { useState, useEffect, useRef } from "react";
import Style from "./Style.module.css";
import Header from "../../../Components/AdminComponents/Header/Header";
import Sidebar from "../../../Components/AdminComponents/Sidebar/Sidebar";
import { BsPlusCircle } from "react-icons/bs";
import { Delete } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import adminInstance from "../../../instance/AdminInstance";

const New = ({ title }) => {
  const selectRef1 = useRef(null);
  const selectRef2 = useRef(null);
  const selectRef3 = useRef(null);

  const navigate = useNavigate();

  const [NestedCategoryName, SetNestedCategoryName] = useState("");
  const [SubCategory, SetSubCategory] = useState([]);
  const [FormInputs, SetFormInputs] = useState([]);
  const [CurrentInput, SetCurrentInput] = useState({
    label: "",
    type: "",
    options: [],
    name: "",
    important: false,
  });

  const [OptionData, SetOptionData] = useState("");
  const [Options, SetOptions] = useState([]);

  // Fetch subcategories
  useEffect(() => {
    adminInstance
      .get("/api/category/get_subcategory")
      .then((response) => {
        SetSubCategory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const optionHandler = (e) => {
    if (CurrentInput.type === "select") {
      SetOptions([...Options, { value: OptionData, label: OptionData }]);
    } else if (CurrentInput.type === "radio") {
      SetOptions([...Options, OptionData]);
    }
    SetOptionData("");
  };

  const handleAddProperty = () => {
    SetCurrentInput((prevCurrentInput) => ({
      ...prevCurrentInput,
      options: [...prevCurrentInput.options, ...Options],
    }));
    SetFormInputs((prevFormInputs) => [...prevFormInputs, CurrentInput]);
    SetOptions([]);
    SetCurrentInput({
      label: "",
      type: "",
      options: [],
      name: "",
      important: false,
    });

    if (selectRef2.current) selectRef2.current.value = "";
    if (selectRef3.current) selectRef3.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminInstance
      .post("/api/super_admin/category/add_nested", {
        subcategoryId: selectRef1.current.value,
        nestedCategory: NestedCategoryName,
        formInputs: FormInputs,
      })
      .then((response) => {
        SetNestedCategoryName("");
        SetFormInputs([]);
        selectRef1.current.value = "";
        toast.success("Successfully Created");
        navigate("/admin/nestedcategory");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something Went Wrong");
      });
  };

  const HandleCancel = (e) => {
    e.preventDefault();
    SetFormInputs([]);
    navigate("/admin/nestedcategory");
  };

  return (
    <div className={Style.new}>
      <Sidebar />
      <div className={Style.newContainer}>
        <Header />

        <div className={Style.top}>
          <h1>{title}</h1>
        </div>

        <div className={Style.center}>
          <div className={Style.right}>
            <form onSubmit={handleSubmit}>
              <div className={Style.formInput}>
                <label>
                  NestedCategory Name <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  required
                  id="nestedcategory"
                  value={NestedCategoryName}
                  onChange={(e) => SetNestedCategoryName(e.target.value)}
                />
              </div>

              <div className={Style.formInput}>
                <label>
                  SubCategory Name <span>*</span>
                </label>
                <select
                  name="subcategoryname"
                  defaultValue=""
                  ref={selectRef1}
                  required
                >
                  <option value="" disabled hidden>
                    Choose here
                  </option>
                  {Array.isArray(SubCategory) &&
                    SubCategory.map((subcategories) => (
                      <option
                        value={subcategories._id}
                        key={subcategories._id}
                      >
                        {subcategories.subcategory}
                      </option>
                    ))}
                </select>
              </div>

              <div className={Style.formBtn}>
                <Tooltip title="Check before Saving the data">
                  <button type="submit">Save</button>
                </Tooltip>
                <button onClick={HandleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

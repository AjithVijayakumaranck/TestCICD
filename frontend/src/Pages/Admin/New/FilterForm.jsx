import React, { useState, useRef } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header';
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import { Delete } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import adminInstance from '../../../instance/AdminInstance';




const FilterForm = ({ title }) => {

  const { categoryId } = useParams();

  const navigate = useNavigate()
  const selectRef = useRef(null);

  const [FormInputs, SetFormInputs] = useState([])
  const [CurrentInput, SetCurrentInput] = useState({
    label: "",
    type: "",
    options: [],
    defaultMinValue: "",
    defaultMaxValue: "",
    stepValue: ""
  })

  const [MinRange, SetMinRange] = useState("");
  const [MaxRange, SetMaxRange] = useState("");
  const [OptionData, SetOptionData] = useState("");
  const [Options, SetOptions] = useState([]);


  const optionHandler = (e) => {
    if (CurrentInput.type === "range") {
      const newOption = [OptionData, { "min": MinRange, "max": MaxRange }];
      SetOptions([...Options, newOption]);
      SetOptionData("");
      SetMinRange("");
      SetMaxRange("");
    } else if (CurrentInput.type === "radio" || CurrentInput.type === "checkbox") {
      SetOptions([...Options, OptionData])
      SetOptionData("")
    }
  }


  //Handle add all data to formdata
  const handleAddProperty = () => {
    CurrentInput.options.push(...Options)
    SetFormInputs((prevFormInputs) => [...prevFormInputs, CurrentInput]);
    SetOptions("")
    SetCurrentInput({
      label: "",
      type: "",
      options: [],

    })
    selectRef.current.value = ''
  };



  //Handle submiting the data to database
  const handleSubmit = (e) => {
    e.preventDefault()
    adminInstance
      .post('/api/super_admin/category/add_filter', { categoryId: categoryId, filterInputs: FormInputs })
      .then((response) => {
        SetFormInputs([])
        toast.success("Sucessfully Created")
        navigate('/admin/category')
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong")
      });
  };


  // handle remove from table data
  const handleRemove = (index) => {
    const updatedProperties = [...FormInputs];
    updatedProperties.splice(index, 1);
    SetFormInputs(updatedProperties);
  };

  // handle remove option from table data
  const handleOptionsRemove = (index) => {
    const updatedOptions = [...Options];
    updatedOptions.splice(index, 1);
    SetOptions(updatedOptions);
  }

  const HandleCancel = (e) => {
    e.preventDefault()
    SetFormInputs([])
    navigate('/admin/category')
  }


  return (
    <div className={Style.new}>
      <Sidebar />
      <div className={Style.newContainer}>
        <Header />

        <div className={Style.top}>
          <h1>{title}</h1>
        </div>

        <div className={Style.centerDiv}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={Style.input_contents}>

              <div className={Style.field_wrapper}>
                <div className={Style.input_field}>
                  <label>Property Name <span>*</span> </label>
                  <input
                    type="text"
                    placeholder="name"
                    id='proertyname'
                    value={CurrentInput.label}
                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, label: e.target.value }) }}
                  />
                </div>
                <div className={Style.input_field}>
                  <label>Property Type <span>*</span> </label>
                  <select
                    name="propertytype"
                    Selected={CurrentInput.label}
                    ref={selectRef}
                    defaultValue="select..."
                    onChange={(e) => { SetCurrentInput({ ...CurrentInput, type: e.target.value }) }}
                  >
                    <option value="" selected>Choose here</option>
                    <option value="text" >Text</option>
                    <option value="radio" >Radio</option>
                    <option value="range" >Range</option>
                    <option value="checkbox" >CheckBox</option>
                  </select>
                </div>
              </div>

              {CurrentInput.type === 'range' && (
                <div className={Style.additionalOptions}>
                  <div className={Style.rangeField_wrapper}>

                    <div className={Style.field_wrapper}>
                      <div className={Style.input_field}>
                        <label> Default MinValue <span>*</span> </label>
                        <input
                          type="text"
                          placeholder="Text here"
                          id='defaultminvalue'
                          value={CurrentInput?.defaultMinValue}
                          onChange={(e) => { SetCurrentInput({ ...CurrentInput, defaultMinValue: e.target.value }) }}
                        />
                      </div>
                      <div className={Style.input_field}>
                        <label> Default MaxValue <span>*</span> </label>
                        <input
                          type="text"
                          placeholder="Text here"
                          id='defaultmaxvalue'
                          value={CurrentInput?.defaultMaxValue}
                          onChange={(e) => { SetCurrentInput({ ...CurrentInput, defaultMaxValue: e.target.value }) }}
                        />
                      </div>
                      <div className={Style.input_field}>
                        <label> Step Value <span>*</span> </label>
                        <input
                          type="text"
                          placeholder="Text here"
                          id='stepValue'
                          value={CurrentInput?.stepValue}
                          onChange={(e) => { SetCurrentInput({ ...CurrentInput, stepValue: e.target.value }) }}
                        />
                      </div>
                    </div>

                    <div className={Style.field_wrapper}>
                      <div className={Style.input_field}>
                        <label>Options Name <span>*</span> </label>
                        <input
                          type="text"
                          placeholder="Text here"
                          id='proertyname'
                          value={OptionData}
                          onChange={(e) => { SetOptionData(e.target.value) }}
                        />
                      </div>
                      <div className={Style.input_field}>
                        <label>Min <span>*</span> </label>
                        <input
                          type="text"
                          placeholder="Text here"
                          id='propertyname'
                          value={MinRange}
                          onChange={(e) => { SetMinRange(e.target.value) }}
                        />
                      </div>
                      <div className={Style.input_field}>
                        <label>Max <span>*</span> </label>
                        <input
                          type="text"
                          placeholder="Text here"
                          id='propertyname'
                          value={MaxRange}
                          onChange={(e) => { SetMaxRange(e.target.value) }}
                        />
                      </div>
                      <div className={Style.additionalOptions_btn}>
                        <span className={Style.optionButton} onClick={optionHandler} >Add</span>
                      </div>
                    </div>
                  </div>
                  <div className={Style.input_contentBtn}>
                    <span className={Style.optionButton} onClick={handleAddProperty}>Create</span>
                  </div>
                </div>
              )}

              {(CurrentInput.type === 'radio' || CurrentInput.type === 'checkbox') && (
                <div className={Style.additionalOptions}>
                  <div className={Style.field_wrapper}>
                    <div className={Style.input_field}>
                      <label>Options <span>*</span> </label>
                      <input
                        type="text"
                        placeholder="Text here"
                        id='optionname'
                        value={OptionData}
                        onChange={(e) => { SetOptionData(e.target.value) }}
                      />
                    </div>
                    <div className={Style.additionalOptions_btn}>
                      <span className={Style.optionButton} onClick={optionHandler} >Add</span>
                    </div>
                  </div>
                  <div className={Style.input_contentBtn}>
                    <span className={Style.optionButton} onClick={handleAddProperty}>Create</span>
                  </div>
                </div>
              )}

            </div>

            <div className={Style.formButtonDiv}>
              <div className={Style.Button_wrapper}>
                <Tooltip title="Check before Saving the data">
                  <button>Save</button>
                </Tooltip>
                <button onClick={(e) => HandleCancel(e)}>Cancel</button>
              </div>
            </div>

          </form>
        </div>

        {(CurrentInput.type === 'radio' || CurrentInput.type === 'checkbox') && Options.length !== 0 && (
          <div className={Style.bottomTable}>
            <h1 className={Style.title}>Options</h1>
            {Options.map((data, index) => {
              return (
                <div className={Style.details} key={index}>
                  <div className={Style.left}>
                    <div className={Style.detailItem}>
                      <span className={Style.itemValue}>{data}</span>
                    </div>
                  </div>
                  <div className={Style.right}>
                    <button onClick={() => handleOptionsRemove(index)}><Delete /></button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {CurrentInput.type === 'range' && Options.length !== 0 && (
          <div className={Style.bottomTable}>
            <h1 className={Style.title}>Range Options</h1>
            {Options.map((data, index) => {
              const [label, options] = data;
              return (
                <div className={Style.details} key={index}>
                  <div className={Style.left}>
                    <div>
                      <span>{label} : {" "} </span>
                      <span>{" "} min - max = </span>
                      {options && options.min && options.max && (
                        <span>{" "}{options.min} - {options.max}</span>
                      )}
                    </div>
                  </div>
                  <div className={Style.right}>
                    <button onClick={() => handleOptionsRemove(index)}><Delete /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}


        <div className={Style.bottomTable}>
          <h1 className={Style.title}>Information</h1>

          {FormInputs.map((formInput, index) => {
            const FormOptions = formInput.options
            return (
              <div className={Style.details} key={index}>
                <div className={Style.left_wrap}>
                  <div className={Style.detailItem}>
                    <span className={Style.itemKey}>Label:</span>
                    <span className={Style.itemValue}>{formInput.label}</span>
                  </div>
                  <div className={Style.detailItem}>
                    <span className={Style.itemKey}>Type:</span>
                    <span className={Style.itemValue}>{formInput.type}</span>
                  </div>
                  {formInput.type === 'range' && (
                    <div className={Style.left_wrap}>
                      <div className={Style.detailItem}>
                        <span className={Style.itemKey}>Default MinValue: </span>
                        <span className={Style.itemValue}> {" "}{formInput.defaultMinValue}</span>
                      </div>
                      <div className={Style.detailItem}>
                        <span className={Style.itemKey}>Default MaxValue: </span>
                        <span className={Style.itemValue}> {" "}{formInput.defaultMaxValue}</span>
                      </div>
                      <div className={Style.detailItem}>
                        <span className={Style.itemKey}>Step Value: </span>
                        <span className={Style.itemValue}> {" "}{formInput.stepValue}</span>
                      </div>
                    </div>
                  )}

                  {formInput.type === 'range' ?
                    <div className={Style.option_wrap}>
                      <h3 className={Style.option_title}>Options:</h3>
                      <div className={Style.Items}>
                        {FormOptions.map((data, index) => {
                          const [label, options] = data;
                          return (
                            <div className={Style.Item} key={index}>
                              <span className={Style.itemValue}> {label} :</span>
                              {options && options.min && options.max && (
                                <span className={Style.itemValue}> {options.min} - {options.max} </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    :
                    <div className={Style.option_wrap}>
                      <h3 className={Style.option_title}>Options:</h3>

                      <div className={Style.Items}>
                        {FormOptions.map((data, index) => {
                          return (
                            <div className={Style.Item} key={index}>
                              <span className={Style.itemValue}>{data}, </span>
                            </div>
                          )
                        })}
                      </div>

                    </div>
                  }
                </div>

                <div className={Style.right}>
                  <button className={Style.rembtn} onClick={() => handleRemove()}>Remove</button>
                </div>
              </div>
            )
          })}

        </div>


      </div>
    </div>
  );
};

export default FilterForm;
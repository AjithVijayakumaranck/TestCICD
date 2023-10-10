import React, { useState, useEffect, useRef } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header';
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import { BsPlusCircle } from "react-icons/bs";
import { Delete } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import adminInstance from '../../../instance/AdminInstance';




const EditDocumentForm = ({ title }) => {


  const navigate = useNavigate()

  const [Visible, SetVisible] = useState(false);
  const [DocumentName, SetDocumentName] = useState('');
  const [DocumentDescription, SetDocumentDescription] = useState('');
  const [FormInputs, SetFormInputs] = useState([])
  const [CurrentInput, SetCurrentInput] = useState({
    label: "",
    type: "",
    options: [],
  })

  const [OptionData, SetOptionData] = useState("");
  const [Options, SetOptions] = useState([]);

  const selectRef1 = useRef(null);
  const selectRef2 = useRef(null);
  const selectRef3 = useRef(null);


  const optionHandler = (e) => {
    if (CurrentInput.type === "select") {
      console.log(OptionData);
      SetOptions([...Options, { value: OptionData, label: OptionData }])
      SetOptionData("")
    } else if (CurrentInput.type === "radio") {
      SetOptions([...Options, OptionData])
      SetOptionData("")
    }
  }


  //Handle add all data to formdata
  const handleAddProperty = () => {
    console.log(Options, "hello options");
    CurrentInput.options.push(...Options)
    SetFormInputs((prevFormInputs) => [...prevFormInputs, CurrentInput]);
    SetOptions("")
    SetCurrentInput({
      label: "",
      type: "",
      options: [],
      name: "",
      important: false
    })

    selectRef2.current.value = ''
    selectRef3.current.value = ''
  };



  //Handle submiting the data to database
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('CurrentInput:', CurrentInput);
    console.log('FormInputs:', FormInputs);
    // adminInstance
    //   .post('/api/super_admin/category/add_subcategory', { categoryId: categoryName, subCategory: SubcategoryName, formInputs: FormInputs })
    //   .then((response) => {
    //     console.log(response.data);
    //     SetSubcategoryName('')
    //     SetFormInputs([])
    //     selectRef1.current.value = ''
    //     toast.success("Sucessfully Created")
    //     navigate('/admin/subcategory')
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Something Went Wrong")
    //   });
  };


  // handle remove from table data
  const handleRemove = (index) => {
    const updatedProperties = [...FormInputs];
    updatedProperties.splice(index, 1);
    SetFormInputs(updatedProperties);
  };

  const handleOptionsRemove = (index) => {
    const updatedOptions = [...Options];
    updatedOptions.splice(index, 1);
    SetOptions(updatedOptions);
  }



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
            <form onSubmit={(e) => handleSubmit(e)}>

              <div className={Style.formInput}>
                <label>Document Name <span>*</span></label>
                <input
                  type="text"
                  placeholder="Document Name"
                  required
                  id='Documentname'
                  value={DocumentName}
                  onChange={(e) => { SetDocumentName(e.target.value) }}
                />
              </div>

              <div className={Style.formproperty}>
                <label>Document Description </label>
                <textarea
                  name="Document Description"
                  placeholder="More Informations"
                  value={DocumentDescription}
                  onChange={(e) => { SetDocumentDescription(e.target.value) }}
                ></textarea>
              </div>

              <div className={Style.formproperty}>
                <span className={Style.toggleBtn} onClick={() => SetVisible(!Visible)}><BsPlusCircle />  Add Points</span>

                {Visible ?
                  <div className={Style.formWrap}>
                    <div className={Style.formInput}>
                      <label>Sub Data Heading <span>*</span> </label>
                      <input
                        type="text"
                        placeholder="name"
                        id='proertyname'
                        value={CurrentInput.label}
                        onChange={(e) => { SetCurrentInput({ ...CurrentInput, label: e.target.value }) }}
                      />
                    </div>

                    <div className={Style.formInput}>
                      <label>Sub Data Description <span>*</span> </label>
                      <textarea
                        name="description"
                        placeholder="More Informations"
                      // value={ProductData.description}
                      // onChange={(e) => { SetProductData({ ...ProductData, description: e.target.value }) }}
                      ></textarea>
                    </div>

                    <div className={Style.formButtonWrap} >
                      <span className={Style.formButton} onClick={handleAddProperty}>Create</span>
                    </div>
                  </div>
                  : null
                }

              </div>

              <div className={Style.formBtn}>
                <Tooltip title="Check before Saving the data">
                  <button>Save</button>
                </Tooltip>
                <button onClick={() => { navigate('/admin/document') }}>Cancel</button>
              </div>

            </form>
          </div>
        </div>

        {Options.length !== 0 ?
          <div className={Style.bottomTable}>
            <h1 className={Style.title}>Options</h1>
            {Options.map((data, index) => {
              return (
                <div className={Style.details} key={index}>
                  <div className={Style.left}>
                    <div className={Style.detailItem}>
                      <span className={Style.itemValue}>{CurrentInput.type === "select" ? data.value : data}</span>
                    </div>
                  </div>
                  <div className={Style.right}>
                    <button onClick={() => handleOptionsRemove(index)}><Delete /></button>
                  </div>
                </div>
              )
            })}
          </div>
          : null
        }

        <div className={Style.bottomTable}>
          <h1 className={Style.title}>Information</h1>
          {FormInputs.map((formInput) => {
            const FormOptions = formInput.options
            return (
              <div className={Style.details}>
                <div className={Style.left_wrap}>
                  <div className={Style.detailItem}>
                    <span className={Style.itemKey}>Document Name:</span>
                    <span className={Style.itemValue}>{formInput.label}</span>
                  </div>
                  <div className={Style.detailItem}>
                    <span className={Style.itemKey}>Document Description:</span>
                    <span className={Style.itemValue}>{formInput.type}</span>
                  </div>

                  {FormOptions !== "" ?
                    <div className={Style.option_wrap}>
                      <h3 className={Style.option_title}>Options:</h3>
                      <div className={Style.Items}>
                        {FormOptions.map((data, index) => {
                          return (
                            <div className={Style.Item} key={index}>
                              <span className={Style.itemValue}>{formInput.type === "select" ? data.value : data}, </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    : null
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

export default EditDocumentForm;
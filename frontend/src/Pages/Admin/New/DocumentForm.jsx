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




const DocumentForm = ({ title }) => {


  const navigate = useNavigate()

  const [Visible, SetVisible] = useState(false);
  const [DocumentName, SetDocumentName] = useState(''); // For Adding Document Name
  const [DocumentDescription, SetDocumentDescription] = useState(''); // For Adding Document Description
  const [FormInputs, SetFormInputs] = useState([]) // For Storing All Form Data 
  const [DocumentPoints, SetDocumentPoints] = useState(""); //For OptionData
  const [SubData, SetSubData] = useState([]); //For Options
  const [DocumentData, SetDocumentData] = useState({   //For  currentInput 
    subtitle: "",
    subData: [],
  })

  //Handle adding all data points 
  const HandleAddingDataPoints = (e) => {
    SetSubData([...SubData, DocumentPoints])
    SetDocumentPoints("")
  }

  //Handle add all data to formdata
  const HandleCreateSubData = () => {
    DocumentData.subData.push(...SubData)
    SetFormInputs((prevFormInputs) => [...prevFormInputs, DocumentData]);
    SetSubData("")
    SetDocumentData({
      subtitle: "",
      subData: [],
    })
  };



  //Handle submiting the data to database
  const handleSubmit = (e) => {
    e.preventDefault();
    adminInstance
      .post('/api/super_admin/terms/add_terms', { name: DocumentName, description: DocumentDescription, policies: FormInputs })
      .then((response) => {
        SetDocumentName('')
        SetDocumentDescription('')
        SetFormInputs([])
        toast.success("Sucessfully Created")
        navigate('/admin/document')
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong")
      });
  };


  // handle remove sub data from table data
  const HandleOptionsRemove = (index) => {
    const updatedOptions = [...SubData];
    updatedOptions.splice(index, 1);
    SetSubData(updatedOptions);
  }

  // handle remove from table data
  const HandleRemove = (index) => {
    const updatedProperties = [...FormInputs];
    updatedProperties.splice(index, 1);
    SetFormInputs(updatedProperties);
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
                      <label>Subtitle <span>*</span> </label>
                      <input
                        type="text"
                        placeholder="name"
                        id='proertyname'
                        value={DocumentData.subtitle}
                        onChange={(e) => { SetDocumentData({ ...DocumentData, subtitle: e.target.value }) }}
                      />
                    </div>

                    <div className={Style.newform} >
                      <div className={Style.formDescrption}>
                        <label> Document Points  </label>
                        <textarea
                          name="description"
                          placeholder="More Informations"
                          value={DocumentPoints}
                          onChange={(e) => { SetDocumentPoints(e.target.value) }}
                        ></textarea>
                      </div>
                      <div className={Style.formbtn}>
                        <span className={Style.propertyBtn} onClick={HandleAddingDataPoints} >Add</span>
                      </div>
                    </div>

                    <div className={Style.formButtonWrap} >
                      <span className={Style.formButton} onClick={HandleCreateSubData}>Create</span>
                    </div>
                  </div>
                  : null
                }

              </div>

              <div className={Style.formBtn}>
                <Tooltip title="Check the data before Saving the data">
                  <button>Save</button>
                </Tooltip>
                <button onClick={() => { navigate('/admin/document') }}>Cancel</button>
              </div>

            </form>
          </div>
        </div>

        {SubData.length !== 0 && (
          <div className={Style.bottomTable}>
            <h1 className={Style.title}>Sub Points</h1>
            {SubData.map((data, index) => {
              return (
                <div className={Style.details} key={index}>
                  <div className={Style.left}>
                    <div className={Style.detailItem}>
                      <span className={Style.itemValue}> {data} </span>
                    </div>
                  </div>
                  <div className={Style.right}>
                    <button onClick={() => HandleOptionsRemove(index)}> <Delete /> </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}


        <div className={Style.bottomTable}>
          <h1 className={Style.title}>Information</h1>
          {FormInputs.map((formInput, index) => {
            const FormOptions = formInput.subData
            return (
              <div className={Style.details} key={index}>
                <div className={Style.left_wrap}>
                  <div className={Style.detailItem}>
                    <span className={Style.itemKey}>Subtitle Name:</span>
                    <span className={Style.itemValue}>{formInput.subtitle}</span>
                  </div>

                  {FormOptions !== "" && (
                    <div className={Style.option_wrap}>
                      <h3 className={Style.option_title}>SubData Points:</h3>
                      <div className={Style.Items}>
                        {FormOptions.map((data, index) => (
                          <div className={Style.DocumentItem} key={index}>
                            <span className={Style.itemValue}> {data} </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                <div className={Style.right}>
                  <button className={Style.rembtn} onClick={() => HandleRemove(index)}>Remove</button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
};

export default DocumentForm;
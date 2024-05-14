import React, { useState, useEffect, useContext } from 'react'
import Style from './index.module.css'
import instance from "../../instance/AxiosInstance";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { UserContext } from '../../Contexts/UserContext';
import authInstance from '../../instance/AuthInstance';
import { toast } from 'react-toastify';
import Select from "react-select";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeEditOutline } from 'react-icons/md';
import OtpCard from '../Custom/OtpCard/OtpCard';
import InputForm from '../Custom/InputForm/InputForm';


const UpdateProfileForm = () => {

    const navigate = useNavigate();

    const loggedInUser = useContext(UserContext);
    const { User, SetUser } = loggedInUser

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            padding: '0 1rem',
            fontSize: '14px',
            border: '1px solid #ebebeb',
            borderRadius: '4px',
            boxShadow: state.isFocused ? 'none' : null,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            margin: 0,

            '&:hover': {
                boxShadow: 'none', // Remove border on hover
            },
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: 'black', // Change the placeholder color to black
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#ccc' : provided.backgroundColor,
            color: state.isSelected ? 'white' : provided.color,
            fontSize: '14px',

        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            borderLeft: 'none',  // Remove border from the dropdown indicator
        }),
        indicatorSeparator: () => ({
            display: 'none', // Hide the separator
        }),
    };

    // State variables
    const [registrationDate] = useState(new Date()); // Assuming this is fetched or set somewhere
    const [minDOB] = useState(() => {
        const minDOBDate = new Date(registrationDate);
        minDOBDate.setFullYear(minDOBDate.getFullYear() - 90);
        return minDOBDate;
    });
    const [maxDOB] = useState(() => {
        const maxDOBDate = new Date(registrationDate);
        maxDOBDate.setFullYear(maxDOBDate.getFullYear() - 18);
        return maxDOBDate;
    });

    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(false);

    const [IsEmailVerified, SetIsEmailVerified] = useState(false); // State variable to track email verification status
    const [IsPhoneVerified, SetIsPhoneVerified] = useState(false); // State variable to track phone number verification status
    const [IsEmailEditing, SetIsEmailEditing] = useState(false); // State variable to track if email is being edited
    const [IsPhoneEditing, SetIsPhoneEditing] = useState(false);  // State variable to track if phone number is being edited

    const [Checking, SetChecking] = useState(false); // State variable to track if pseudoname is available or not

    const [otpDetails, setOtpDetails] = useState("");

    const [Error, SetError] = useState({});
    const [CurrentProfileImage, SetCurrentProfileImage] = useState("")
    const [CurrentProfile, SetCurrentProfile] = useState({
        _id: User._id,
        fullname: "",
        surname: "",
        dob: "",
        pseudoName: "",
        address: {
            streetName: "",
            houseName: "",
            locality: "",
            region: "",
            district: "",
            state: "",
        },
        email: "",
        phoneNumber: "",
    });

    const [UpdateProfile, SetUpdateProfile] = useState({

        dob: "",
        email: "",
        fullname: "",
        phoneNumber: "",
        surname: "",
        pseudoName: "",
        address: {
            streetName: "",
            houseName: "",
            locality: "",
            region: "",
            district: "",
            state: "",
        },
        _id: User._id,

    });

    const [File, SetFile] = useState({
        File: "",
        FileUrl: "",
        Caption: ""
    });

    const [States, SetStates] = useState([])
    const [StateId, SetStateId] = useState("")
    const [District, SetDistrict] = useState([])
    const [DistrictId, SetDistrictId] = useState("")
    const [Locality, SetLocality] = useState([])

    const options = [
        { value: 'India', label: 'India' },
        { value: 'France', label: 'France' },
    ];

    //Load user data
    useEffect(() => {
        try {
            instance.get(`/api/user/profile/get_profile/${User._id}`).then((result) => {
                SetUpdateProfile(result.data);
                SetCurrentProfile(result.data);
                SetCurrentProfileImage(result.data?.profilePicture?.url)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }, [User]);

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
    }, [])


    const StateOptions = States.map((state) => ({
        value: state.state_id,
        label: state.state_name
    }));

    useEffect(() => {
        try {
            instance.get(`/api/user/filter/search_state?districtCode=${StateId}`).then((response) => {
                SetDistrict(response.data.districts)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }, [StateId])


    const DistrictOptions = District ? District.map((data) => ({
        value: data.district_id,
        label: data.district_name
    })) : [];

    useEffect(() => {
        try {
            instance.get(`/api/user/filter/search_locality?district=${DistrictId}`).then((response) => {
                SetLocality(response.data)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }, [DistrictId])

    const LocalityOptions = Locality ? Locality.map((data) => ({
        value: data.village_locality_name,
        label: data.village_locality_name
    })) : [];



    const DefaultImage = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"


    const uploadFile = (e) => {
        SetFile({
            ...File, FileUrl: URL.createObjectURL(e.target.files[0]),
            File: e.target.files[0]
        });
    }


    // -------------validation---------------

    const validateForm = () => {
        let newErrors = {};

        if (UpdateProfile.fullname === '') {
            newErrors.fullname = 'Fullname is required';
        }

        if (UpdateProfile.surname === '') {
            newErrors.surname = 'Surname is required';
        }

        if (UpdateProfile.pseudoName === '') {
            newErrors.pseudonym = 'Pseudonym is required';
        }

        if (UpdateProfile.address.houseName === '') {
            newErrors.houseName = 'House Name is required';
        }

        if (UpdateProfile.address.streetName === '') {
            newErrors.streetName = 'street Name is required';
        }
        if (UpdateProfile.address.locality === '') {
            newErrors.locality = 'Locality is required';
        }

        if (UpdateProfile.address.state === '') {
            newErrors.state = 'State is required';
        }

        if (UpdateProfile.address.district === '') {
            newErrors.district = 'District is required';
        }

        if (UpdateProfile.address.region === '') {
            newErrors.region = 'Region is required';
        }

        // Set the new errors state
        SetError(newErrors);
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;

    };

    // Handler for validating date of birth
    const handleDOBChange = (event) => {
        const inputDate = new Date(event.target.value);
        if (inputDate > maxDOB) {
            SetError({ ...Error, dob: "You must be at least 18 years old." });
        } else if (inputDate < minDOB) {
            SetError({ ...Error, dob: "You cannot be more than 90 years old." });
        } else {
            SetError({ ...Error, dob: "" });
        }
        SetUpdateProfile({ ...UpdateProfile, dob: event.target.value })
        SetError({ ...Error, dob: "" });
    };

    const email_validation = (email) => {
        if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
            SetError({ ...Error, email: "" });
            return true;
        } else {
            SetError({ ...Error, email: "Invalid email" });
            return false;
        }
    };

    const phone_validation = (phoneNumber) => {
        if (phoneNumber !== "") {
            if (phoneNumber.toString().length < 10) {
                SetError({ ...Error, phoneNumber: "Phonenumber must have 10 digits" });
            } else {
                SetError({ ...Error, phoneNumber: "" });
                return true;
            }
        } else {
            SetError({ ...Error, phoneNumber: "This field cannot be empty" });
            return false;
        }
    };



    // -------------------Validation end--------------------


    // -- Handle Pseudonym checking
    const HandleChecking = (Pseudo) => {
        SetChecking(true);
        try {
            authInstance.post('/api/user/profile/check_pseudoname', { pseudoNameCheck: Pseudo }).then((response) => {
                SetUpdateProfile({ ...UpdateProfile, pseudoName: Pseudo });
                SetChecking(false);
                SetError({ ...Error, pseudonym: "" });
            }).catch((err) => {
                SetChecking(false);
                SetError({ ...Error, pseudonym: "These name is already taken" });
            })
        } catch (error) {
            console.log(error);
        }

    }

    // Handle submit 
    const HandleSubmit = (e) => {
        e.preventDefault();
        // Check if there are no validation form error
        if (validateForm()) {
            // Perform the submit action 
            let data = new FormData()
            if (File.File === "") {
                if (CurrentProfileImage !== "") {
                    data.append("file", DefaultImage)
                }
                else {
                    data.append("file", DefaultImage)
                }
            } else {
                data.append("file", File.File)
            }

            const objectData = JSON.stringify(UpdateProfile);
            data.append('userData', objectData);

            authInstance.put('/api/user/profile/update_profile', data).then((Response) => {
                toast.success("profile updated")
                navigate('/profile')
            }).catch((err) => {
                console.log(err);
                toast.error("Something Went Wrong")
            })

            // Clear any previous errors
            SetError({});

        } else {
            console.log('Form validation failed');
        }
    };



    //-----------email & phone otp verify--------------


    const handleVerifyEmail = (e) => {
        e.preventDefault();

        authInstance.post("/api/user/profile/update_email", { updatingEmail: UpdateProfile.email, currentEmail: CurrentProfile.email, userId: User._id }).then((response) => {
            setLoading(false);
            setOtp(true);
        }).catch((Error) => {
            setLoading(false);
            toast.error(Error.response.data.message);
        });
    }

    const handleVerifyPhoneNumber = (e) => {
        e.preventDefault();
        authInstance.post("/api/user/profile/update_phone", { phonenumber: UpdateProfile.phoneNumber, userId: User._id }).then((response) => {
            setLoading(false);
            setOtp(true);
        }).catch((Error) => {
            setLoading(false);
            toast.error(Error.response.data.message);
        });
    }


    // -----------otp Verify Handler-------------

    const otpVerifyHandle = (e) => {
        e.preventDefault();
        SetError({ ...Error, otp: "" });
        if (e.target.value === "") {
            SetError({ ...Error, otp: "enter the otp" });
        } else {
            setLoading(true);
            IsPhoneEditing
                ? authInstance.put("/api/user/profile/verify_phone", { otp: otpDetails, phoneNumber: UpdateProfile.phoneNumber, userId: User._id }).then((response) => {
                    setLoading(false);
                    setOtp(false)
                    SetIsPhoneVerified(true)
                    SetIsPhoneEditing(false)
                    toast.success("phone number verified")
                    setOtpDetails("")
                }).catch((error) => {
                    setLoading(false);
                    toast.error("failed phone number verification")
                    setOtp(false)
                })
                : authInstance.put("/api/user/profile/verify_email", { otp: otpDetails, updatingEmail: UpdateProfile.email, currentEmail: CurrentProfile.email, userId: User._id }).then((response) => {
                    setLoading(false);
                    setOtp(false)
                    SetIsEmailVerified(true)
                    SetIsEmailEditing(false)
                    toast.success("email verified")
                    setOtpDetails("")

                }).catch((error) => {
                    setLoading(false);
                    toast.error("failed email verification")
                    setOtp(false)
                });
        }
    };
    // -------------------end--------------------

    //Delete User Profile
    const handleDeleteUser = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#046BD2',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                authInstance.delete(`/api/user/profile/delete_account/${User._id}`).then((response) => {
                    toast.success("user deleted")
                    localStorage.removeItem('logged');
                    localStorage.removeItem('token');
                    SetUser("");
                    navigate('/registration_login')
                }).catch((error) => {
                    console.log(error);
                    toast.error("error deleting user")
                })
            }
        })
    }



    return (
        <div className={Style.content_wrapper}>
            <div className={Style.container}>
                {otp ? (
                    <OtpCard
                        otp={otp}
                        setOtp={setOtp}
                        otpDetails={otpDetails}
                        setOtpDetails={setOtpDetails}
                        loading={loading}
                        otpVerifyHandle={otpVerifyHandle}
                        Error={Error}
                    />
                ) : (
                    <div className={Style.main_row}>
                        <form action="" onSubmit={(e) => HandleSubmit(e)}>
                            <div className={Style.left}>
                                <div className={Style.row}>
                                    <div className={Style.left_col}>
                                        <div className={Style.Image_info}>
                                            <img
                                                src={
                                                    File.FileUrl
                                                        ? File.FileUrl
                                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                                }
                                                alt=""
                                            />
                                            <div className={Style.formImage}>
                                                <label htmlFor="file">
                                                    <i><MdModeEditOutline /></i>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="file"
                                                    onChange={uploadFile}
                                                    style={{ display: "none" }}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className={Style.row}>
                                    <div className={Style.items}>
                                        <div className={Style.item} onClick={() => navigate(`/changepassword/${User._id}`)}>
                                            <span > <i> <MdModeEditOutline /> </i> Change Account Password  </span>
                                        </div>
                                        <div className={Style.item} onClick={() => { handleDeleteUser() }} >
                                            <span> <i> <RiDeleteBin6Line className={Style.del_icon} /> </i> Delete Account </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={Style.right}>
                                <div className={Style.title}>
                                    <h2>Basic Information</h2>
                                </div>
                                <div className={Style.notificationDiv}>
                                    <p>All your private informations are  for KYC purpose (Know Your Customer)
                                        and  are safe with us We won't share or sell it to third party!</p>
                                </div>
                                <div className={Style.form_wrapper}>
                                    <div className={Style.flex_row}>
                                        <div className={Style.col}>
                                            <label >First Name <span>*</span></label>
                                            <InputForm
                                                type="text"
                                                placeholder='Fullname'
                                                id="Fullname"
                                                name="fullname"
                                                value={UpdateProfile.fullname}
                                                onChange={(e) => { SetUpdateProfile({ ...UpdateProfile, fullname: e.target.value }) }}
                                            />
                                            <p className={Style.error}>{Error.fullname}</p>
                                        </div>
                                        <div className={Style.col}>
                                            <label >Last Name <span>*</span></label>
                                            <InputForm
                                                type="text"
                                                placeholder='Surname'
                                                id="Lastname"
                                                name="lastname"
                                                value={UpdateProfile.surname}
                                                onChange={(e) => { SetUpdateProfile({ ...UpdateProfile, surname: e.target.value }) }}
                                            />
                                            <p className={Style.error}>{Error.surname}</p>
                                        </div>
                                    </div>
                                    <div className={Style.flex_row}>
                                        <div className={Style.col}>
                                            <label >Pseudonym <span>*</span></label>
                                            <div className={Style.border_col}>
                                                <InputForm
                                                    type="text"
                                                    placeholder='Pseudonym'
                                                    id="Pseudonym"
                                                    name="Pseudonym"
                                                    value={UpdateProfile.pseudoName}
                                                    onChange={(e) => {
                                                        SetUpdateProfile({ ...UpdateProfile, pseudoName: e.target.value });
                                                        HandleChecking(e.target.value);
                                                    }}
                                                    customClass={Style.borderless}
                                                />
                                                {Checking && (
                                                    <div className={Style.check}>
                                                        <span>Checking ...</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className={Style.error}>{Error.pseudonym}</p>
                                        </div>
                                    </div>
                                    <div className={Style.row}>
                                        <div className={Style.col}>
                                            <label >Date of Birth <span>*</span></label>
                                            <input
                                                type="date"
                                                placeholder='Date Of Birth'
                                                id="Date Of Birth"
                                                name="Date Of Birth"
                                                className={Style.dobInput}
                                                max={maxDOB.toISOString().split('T')[0]}
                                                min={minDOB.toISOString().split('T')[0]}
                                                value={UpdateProfile.dob}
                                                onChange={(e) => { handleDOBChange(e) }}
                                            />
                                            <p className={Style.error}>{Error.dob}</p>
                                        </div>
                                    </div>
                                    <div className={Style.row}>
                                        <div className={Style.col}>
                                            <label >House Name or Number / Flat Name or Number <span>*</span></label>
                                            <InputForm
                                                type="text"
                                                placeholder='House Name or Number / Flat Name or Number'
                                                id="houseName"
                                                name="houseName"
                                                value={UpdateProfile.address.houseName}
                                                onChange={(e) => {
                                                    SetUpdateProfile({ ...UpdateProfile, address: { ...UpdateProfile.address, houseName: e.target.value } })
                                                }}
                                            />
                                            <p className={Style.error}>{Error.houseName}</p>
                                        </div>
                                    </div>
                                    <div className={Style.row}>
                                        <div className={Style.col}>
                                            <label >Street Name <span>*</span></label>
                                            <InputForm
                                                type="text"
                                                placeholder='Street Name'
                                                id="StreetName"
                                                name="StreetName"
                                                value={UpdateProfile.address.streetName}
                                                onChange={(e) => {
                                                    SetUpdateProfile({ ...UpdateProfile, address: { ...UpdateProfile.address, streetName: e.target.value } })
                                                }}
                                            />
                                            <p className={Style.error}>{Error.streetName}</p>
                                        </div>
                                    </div>

                                    <div className={Style.flex_row}>
                                        <div className={Style.col}>
                                            <label >State <span>*</span></label>
                                            <Select
                                                options={StateOptions}
                                                placeholder={UpdateProfile?.address?.state ? UpdateProfile.address.state : "State"}
                                                isSearchable={true}
                                                onChange={(e) => {
                                                    SetUpdateProfile({ ...UpdateProfile, address: { ...UpdateProfile.address, state: e.label } })
                                                    SetStateId(e.value)
                                                }}
                                                styles={customStyles}
                                            />
                                            <p className={Style.error}>{Error.state}</p>
                                        </div>

                                        <div className={Style.col}>
                                            <label >District <span>*</span></label>
                                            <Select
                                                options={DistrictOptions}
                                                placeholder={UpdateProfile?.address?.district ? UpdateProfile.address.district : "District"}
                                                onChange={(e) => {
                                                    SetUpdateProfile({ ...UpdateProfile, address: { ...UpdateProfile.address, district: e.label } })
                                                    SetDistrictId(e.label)
                                                }}
                                                styles={customStyles}
                                                isDisabled={StateId.length === 0}
                                            />
                                            <p className={Style.error}>{Error.district}</p>
                                        </div>
                                    </div>

                                    <div className={Style.flex_row}>
                                        <div className={Style.col}>
                                            <label>Locality <span>*</span></label>
                                            <Select
                                                options={LocalityOptions}
                                                placeholder={UpdateProfile?.address?.locality ? UpdateProfile.address.locality : "Locality"}
                                                onChange={(e) => {
                                                    SetUpdateProfile({ ...UpdateProfile, address: { ...UpdateProfile.address, locality: e.label } })
                                                }}
                                                styles={customStyles}
                                                isDisabled={DistrictId.length === 0}
                                            />
                                            <p className={Style.error}>{Error.locality}</p>
                                        </div>

                                        <div className={Style.col}>
                                            <label >Region <span>*</span></label>
                                            <Select
                                                options={options}
                                                placeholder={UpdateProfile?.address?.region ? UpdateProfile.address.region : "Region"}
                                                onChange={(e) => {
                                                    SetUpdateProfile({ ...UpdateProfile, address: { ...UpdateProfile.address, region: e.label } })
                                                }}
                                                styles={customStyles}
                                            />
                                            <p className={Style.error}>{Error.region}</p>
                                        </div>
                                    </div>
                                    <div className={Style.flex_row}>
                                        <div className={Style.col}>
                                            <label >Email <span>*</span></label>
                                            <div className={Style.flex_col}>
                                                <InputForm
                                                    type="email"
                                                    placeholder='Email'
                                                    name="email"
                                                    value={UpdateProfile.email}
                                                    onChange={(e) => {
                                                        SetUpdateProfile({ ...UpdateProfile, email: e.target.value });
                                                        SetIsEmailEditing(true);
                                                        email_validation(e.target.value);
                                                    }}
                                                    customClass={Style.form_Input}
                                                />
                                                {IsEmailEditing && !IsEmailVerified && (
                                                    <div className={Style.form_button} onClick={handleVerifyEmail}>
                                                        <button>Verify</button>
                                                    </div>
                                                )}
                                            </div>
                                            <p className={Style.error}>{Error.email}</p>
                                        </div>
                                    </div>
                                    <div className={Style.flex_row}>
                                        <div className={Style.col}>
                                            <label >Phone Number <span>*</span></label>
                                            <div className={Style.flex_col}>
                                                <InputForm
                                                    type="tel"
                                                    placeholder='Phone number'
                                                    name="phoneNumber"
                                                    value={UpdateProfile.phoneNumber}
                                                    onChange={(e) => {
                                                        SetUpdateProfile({ ...UpdateProfile, phoneNumber: e.target.value });
                                                        SetIsPhoneEditing(true);
                                                        phone_validation(e.target.value);
                                                    }}
                                                    customClass={Style.form_Input}
                                                />
                                                {IsPhoneEditing && !IsPhoneVerified && (
                                                    <div className={Style.form_button} onClick={handleVerifyPhoneNumber}>
                                                        <button>Verify</button>
                                                    </div>
                                                )}
                                            </div>
                                            <p className={Style.error}>{Error.phoneNumber}</p>
                                        </div>
                                    </div>
                                    <div className={Style.button_row}>
                                        <div className={Style.cancelBtn} onClick={() => navigate(`/profile`)}>
                                            <button>Cancel</button>
                                        </div>
                                        <div className={Style.submitBtn}>
                                            <button>Save</button>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div >
    )
}

export default UpdateProfileForm
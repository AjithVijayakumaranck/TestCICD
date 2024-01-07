import React, { useState, useEffect, useContext } from 'react'
import Style from './index.module.css'
import LoadingSpin from "react-loading-spin";
import instance from "../../instance/AxiosInstance";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { UserContext } from '../../Contexts/UserContext';
import authInstance from '../../instance/AuthInstance';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeEditOutline } from 'react-icons/md';



const UpdateProfileForm = () => {



    const navigate = useNavigate();

    const loggedInUser = useContext(UserContext);
    const { User, SetUser } = loggedInUser

    //authentication option


    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(false);

    const [IsEmailVerified, SetIsEmailVerified] = useState(false); // State variable to track email verification status
    const [IsPhoneVerified, SetIsPhoneVerified] = useState(false); // State variable to track phone number verification status
    const [IsEmailEditing, SetIsEmailEditing] = useState(false); // State variable to track if email is being edited
    const [IsPhoneEditing, SetIsPhoneEditing] = useState(false);  // State variable to track if phone number is being edited



    const [otpDetails, setOtpDetails] = useState("");

    const [Error, SetError] = useState({});
    const [CurrentProfileImage, SetCurrentProfileImage] = useState("")
    const [CurrentProfile, SetCurrentProfile] = useState({
        _id: User._id,
        fullname: "",
        surname: "",
        dob: "",
        address: {
            locality: "",
            region: "",
            district: "",
            state: "",
        },
        email: "",
        phoneNumber: "",
    });

    // const [UpdateProfile, SetUpdateProfile] = useState({})

    const [UpdateProfile, SetUpdateProfile] = useState({

        dob: "",
        email: "",
        fullname: "",
        phoneNumber: "",
        surname: "",

        address: {
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

        // Set the new errors state
        SetError(newErrors);
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;

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





    //Handle submit 

    const handleSubmit = (e) => {
        e.preventDefault();
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

    //Load user data
    useEffect(() => {
        try {
            instance.get(`/api/user/profile/get_profile/${User._id}`).then((result) => {
                SetUpdateProfile(result.data);
                SetCurrentProfile(result.data);
                SetCurrentProfileImage(result.data.profilePicture.url)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }, [User]);


    //-----------email & phone otp verify--------------


    const handleVerifyEmail = (e) => {
        e.preventDefault();

        authInstance.post("/api/user/profile/update_email", { updatingEmail: UpdateProfile.email, currentEmail: CurrentProfile.email, userId: User._id }).then((response) => {
            setLoading(false);
            setOtp(true);
        }).catch((Error) => {
            setLoading(false);
            console.log(Error);
        });
    }

    const handleVerifyPhoneNumber = (e) => {
        e.preventDefault();
        authInstance.post("/api/user/profile/update_phone", { phonenumber: UpdateProfile.phoneNumber, userId: User._id }).then((response) => {
            setLoading(false);
            setOtp(true);
        }).catch((Error) => {
            setLoading(false);
            console.log(Error);
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
                    console.log(error);
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
                    console.log(error);
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
                    <div className={Style.OtpSection} >
                        <h1>Lets Authenticate</h1>
                        <p> We have sent you a One Time Password to your{" "} </p>
                        <form onSubmit={(e) => { otpVerifyHandle(e); }}>
                            <label htmlFor="OTP">Enter Your Otp here</label>
                            <div className={Style.input_div}>
                                <input
                                    type="number"
                                    placeholder="One Time Password"
                                    id="OTP"
                                    value={otpDetails.otp}
                                    onChange={(e) => { setOtpDetails(e.target.value) }}
                                />
                                <div className={Style.otpbtn_div} >
                                    <button className={Style.otpbtn}>
                                        {loading ?
                                            (<LoadingSpin size="20px" direction="alternate" width="4px" />)
                                            : ("Verify")}
                                    </button>
                                </div>
                                <p className={Style.error_para}>{Error.otp}</p>
                            </div>
                        </form>
                    </div>

                ) : (
                    <div className={Style.row}>
                        <form action="" onSubmit={(e) => handleSubmit(e)}>
                            <div className={Style.left}>
                                <div className={Style.row}>
                                    <div className={Style.col}>
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
                                <div className={Style.main_row}>
                                    <div className={Style.row}>
                                        <div className={Style.col}>
                                            <div className={Style.formInput}>
                                                <input type="text"
                                                    placeholder='Fullname'
                                                    id="Fullname"
                                                    name="fullname"
                                                    value={UpdateProfile.fullname}
                                                    onChange={(e) => { SetUpdateProfile({ ...UpdateProfile, fullname: e.target.value }) }}
                                                />
                                            </div>
                                            <p>{Error.fullname}</p>
                                        </div>
                                        <div className={Style.col}>
                                            <div className={Style.formInput}>
                                                <input type="text"
                                                    placeholder='Surname'
                                                    id="Lastname"
                                                    name="lastname"
                                                    value={UpdateProfile.surname}
                                                    onChange={(e) => { SetUpdateProfile({ ...UpdateProfile, surname: e.target.value }) }}
                                                />
                                            </div>
                                            <p>{Error.surname}</p>
                                        </div>
                                    </div>
                                    <div className={Style.row}>
                                        <div className={Style.col}>
                                            <div className={Style.formInput}>
                                                <input type="date"
                                                    placeholder='Date Of Birth'
                                                    id="Date Of Birth"
                                                    name="Date Of Birth"
                                                    value={UpdateProfile.dob}
                                                    onChange={(e) => { SetUpdateProfile({ ...UpdateProfile, dob: e.target.value }) }}
                                                />
                                            </div>
                                            <p>{Error.dob}</p>
                                        </div>
                                    </div>
                                    <div className={Style.row}>
                                        <div className={Style.col}>
                                            <div className={Style.formInput}>
                                                <input type="text"
                                                    placeholder='Locality'
                                                    id="Locality"
                                                    name="locality"
                                                    value={UpdateProfile.address.locality}
                                                    onChange={(e) => SetUpdateProfile({ ...UpdateProfile, address: { ...UpdateProfile.address, locality: e.target.value } })}
                                                />
                                            </div>
                                            <p>{Error.locality}</p>
                                        </div>
                                        <div className={Style.col}>
                                            <div className={Style.formInput}>
                                                <input
                                                    type="text"
                                                    placeholder='District'
                                                    id="District"
                                                    name="district"
                                                    value={UpdateProfile.address.district}
                                                    onChange={(e) => SetUpdateProfile({ ...UpdateProfile, address: { ...UpdateProfile.address, district: e.target.value } })}
                                                />
                                            </div>
                                            <p>{Error.district}</p>
                                        </div>
                                    </div>
                                    <div className={Style.row}>
                                        <div className={Style.col}>
                                            <div className={Style.formInput}>
                                                <input
                                                    type="text"
                                                    placeholder='State'
                                                    id="State"
                                                    name="state"
                                                    value={UpdateProfile.address.state}
                                                    onChange={(e) => SetUpdateProfile({ ...UpdateProfile, address: { ...UpdateProfile.address, state: e.target.value } })}
                                                />
                                            </div>
                                            <p>{Error.state}</p>
                                        </div>
                                        <div className={Style.col}>
                                            <div className={Style.formInput}>
                                                <input
                                                    type="text"
                                                    placeholder='Region'
                                                    id="Region"
                                                    name="region"
                                                    value={UpdateProfile.address.region}
                                                    onChange={(e) => SetUpdateProfile({ ...UpdateProfile, address: { ...UpdateProfile.address, region: e.target.value } })}
                                                />
                                            </div>
                                            <p>{Error.region}</p>
                                        </div>
                                    </div>
                                    <div className={Style.flexrow}>
                                        <div className={Style.row}>
                                            <div className={Style.flexcol}>
                                                <div className={Style.formInput}>
                                                    <input type="email"
                                                        placeholder='Email'
                                                        name="email"
                                                        value={UpdateProfile.email}
                                                        onChange={(e) => {
                                                            SetUpdateProfile({ ...UpdateProfile, email: e.target.value }); // Update state1 as well
                                                            SetIsEmailEditing(true);
                                                            email_validation(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {IsEmailEditing && !IsEmailVerified && (
                                                <div className={Style.col} onClick={handleVerifyEmail}>
                                                    <button>Verify</button>
                                                </div>
                                            )}
                                        </div>
                                        <p>{Error.email}</p>
                                    </div>
                                    <div className={Style.flexrow}>
                                        <div className={Style.row}>
                                            <div className={Style.flexcol}>
                                                <div className={Style.formInput}>
                                                    <input
                                                        type="tel"
                                                        placeholder='Phone number'
                                                        name="phoneNumber"
                                                        value={UpdateProfile.phoneNumber}
                                                        onChange={(e) => {
                                                            SetUpdateProfile({ ...UpdateProfile, phoneNumber: e.target.value }); // Update state1 as well
                                                            SetIsPhoneEditing(true);
                                                            phone_validation(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {IsPhoneEditing && !IsPhoneVerified && (
                                                <div className={Style.col} onClick={handleVerifyPhoneNumber}>
                                                    <button>Verify</button>
                                                </div>
                                            )}
                                        </div>
                                        <p>{Error.phoneNumber}</p>
                                    </div>

                                    <div className={Style.button_row}>
                                        <button onClick={() => navigate(`/profile`)}>  Cancel <i> <RxCross2 /> </i> </button>
                                        <button> Save Changes <i> <HiOutlineArrowNarrowRight /> </i></button>
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
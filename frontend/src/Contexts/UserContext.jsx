import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode"

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
    const [User, SetUser] = useState({})



    useEffect(() => {
        const decodeToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwt_decode(token);
                //console.log(decodedToken._doc, "userToken decode");
                SetUser(decodedToken._doc);
                //console.log(User, "usertoken");
            }

        };

        // Call the decodeToken function when the component mounts
        decodeToken();
    }, [])
    return (
        <UserContext.Provider value={{ User, SetUser }}>
            {children}
        </UserContext.Provider>
    )
}
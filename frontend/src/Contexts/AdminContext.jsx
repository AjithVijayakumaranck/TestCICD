import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";


export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
    const [Admin, SetAdmin] = useState({})


    useEffect(() => {
        const decodeToken = async () => {

            const Token = await localStorage.getItem('AdminToken');

            if (Token) {
                const decodedToken = jwt_decode(Token);
                SetAdmin(decodedToken._doc);
            }
        };
        // Call the decodeToken function when the component mounts
        decodeToken();
    }, [])

    return (
        <AdminContext.Provider value={{ Admin, SetAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}   
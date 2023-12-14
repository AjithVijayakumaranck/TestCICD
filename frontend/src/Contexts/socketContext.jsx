import React, { createContext, useContext, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { UserContext } from './UserContext';

// Create a new context
export const SocketContext = createContext();

// Create a custom SocketProvider component
export const SocketProvider = ({ children }) => {

    const socketUrl = process.env.REACT_APP_SOCKET_URL

    const LoggedInUser = useContext(UserContext);
    const { User, SetUser } = LoggedInUser

    console.log(socketUrl);
    // Initialize the socket instance

    const socket = socketIOClient.connect(socketUrl, { path: "/socket/socket.io", withCredentials: true });

    socket.emit("addUser", {
        userId: User._id,
    });

    // Clean up the socket connection on component unmount
    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        // Provide the socket instance through the context
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};
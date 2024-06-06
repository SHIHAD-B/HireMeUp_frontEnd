import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { RootState } from "@/redux/store";

export interface ISocketContextType {
    socket: Socket | null;
    messages: any[];
    onlineUsers: any[];
}

export const SocketContext = createContext<ISocketContextType>({
    socket: null,
    messages: [],
    onlineUsers: []
});

export const useSocketContext = (): ISocketContextType => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
    const { user } = useSelector((state: RootState) => state.user);
    const {data}=useSelector((state:RootState)=>state.company)

    useEffect(() => {
        const userId = user?.email ? user._id : data?.email ? data._id : null;

        if (userId) {
            const newSocket = io('http://localhost:4003', {
                query: { userId }
            });
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to socket server');
            });

            newSocket.on('new message', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            newSocket.on('onlineUsers', (users) => {
                setOnlineUsers(users);
            });

            return () => {
                newSocket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user?.email, data?.email]);

    const contextValue: ISocketContextType = {
        socket,
        messages,
        onlineUsers
    };

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};

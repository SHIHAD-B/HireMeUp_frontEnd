import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { RootState } from "@/redux/store";
import { VideoCallNotification } from "@/components/common/videoCallToast";
import { SOCkET_URL } from "@/interfaces/config/constant";

export interface ISocketContextType {
    socket: Socket | null;
    messages: any[];
    onlineUsers: any[];
    videoCall: any[];
}

export const SocketContext = createContext<ISocketContextType>({
    socket: null,
    messages: [],
    onlineUsers: [],
    videoCall: []
});

export const useSocketContext = (): ISocketContextType => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
    const [videoCall, setVideoCall] = useState<{ id: string; link: any }[]>([]);
    const { user } = useSelector((state: RootState) => state.user);
    const { data } = useSelector((state: RootState) => state.company);
    const [incomingCallData, setIncomingCallData] = useState<any>(null);

    useEffect(() => {
        const userId = user?.email ? user._id : data?.email ? data._id : null;

        if (userId) {
            const newSocket = io(SOCkET_URL, {
                query: { userId:userId }
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

            newSocket.on('video received', (data) => {
                setVideoCall((prevVideoCalls) => [...prevVideoCalls, data]);
                setIncomingCallData(data); // Set incoming call data
            });
            newSocket?.on('getOnlineUsers', (data => {
                setOnlineUsers(data)
            }))

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
        onlineUsers,
        videoCall
    };

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
            {incomingCallData && <VideoCallNotification data={incomingCallData} />}
        </SocketContext.Provider>
    );
};

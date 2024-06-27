import { UserHeader } from "@/components/user/header"
import { BiSearch } from "react-icons/bi"
import { BsCameraVideo } from "react-icons/bs";
import { TiPinOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { CiMenuKebab } from "react-icons/ci";
import { GoDotFill, GoPaperclip } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import {  useEffect, useRef, useState } from "react";
import newImg from '../../assets/images/newchat.png'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ChatList, allMessageList } from "@/redux/actions/userAction";
import { IChat, IMessage } from "@/interfaces/IUser";
import { companyUserList } from '../../redux/actions/companyAction'
import axios from "axios";
import { BASE_URL } from "@/interfaces/config/constant";
import { useToast } from "@/components/ui/use-toast";
import { useSocketContext } from "@/assets/context/socketContext";
import nochat from '../../assets/images/nochat.png'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import EmojiPicker from 'emoji-picker-react';
import { IoCheckmarkOutline } from "react-icons/io5";
import { LuCheckCheck } from "react-icons/lu";

export const Chat = () => {
    const { onlineUsers } = useSocketContext()
    const navigate = useNavigate()
    const { socket } = useSocketContext()
    const dispatch = useDispatch<AppDispatch>()
    const { toast } = useToast()
    const { data: allMessages } = useSelector((state: RootState) => state.allMessage)
    const { user } = useSelector((state: RootState) => state.user)
    const { data: companyLists } = useSelector((state: RootState) => state.companyList)
    const [notification, setNotification] = useState({ message: '', profile: '' });
    const [isnew, setIsNew] = useState(true);
    const [chatList, setChatList] = useState<IChat[]>()
    const [chatId, setChatId] = useState<string>()
    const messageBoxRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [emoji, setEmoji] = useState(false)
    const [innerChat, setInnerChat] = useState({
        id: "",
        name: "",
        profile: "",
        messages: [] as IMessage[]
    })
    const [message, setMessage] = useState("")
    const [readDatas, setReadDatas] = useState<any>()

    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [innerChat]);

    useEffect(() => {
        const func = async () => {
            try {
                const res = await dispatch(ChatList(String(user?._id)));
                const arr = [...res.payload];

                const validArr = arr.filter(item => item.lastMessage && !isNaN(new Date(item.lastMessage).getTime()));
                if (validArr.length !== arr.length) {
                    console.warn('Some items were excluded from sorting due to invalid lastMessage fields.');
                }

                const sortedArr = validArr.sort((a, b) => {
                    const dateA = new Date(a.lastMessage).getTime();
                    const dateB = new Date(b.lastMessage).getTime();

                    console.log('Comparing:', dateA, dateB);

                    return dateB - dateA;
                });

                setChatList(sortedArr as IChat[]);
            } catch (error) {
                console.error('Error in fetching and sorting chat list:', error);
            }

            try {
                await dispatch(companyUserList());
                await dispatch(allMessageList(String(user?._id)));
            } catch (error) {
                console.error('Error in fetching additional data:', error);
            }
        };

        func();
    }, [dispatch, user]);

    useEffect(() => {
        socket?.on("message recieved", (newMessage: IMessage) => {
            if (newMessage.sender !== user?._id) {
                const sender = companyLists?.find((item) => item._id === newMessage.sender)?.company_name;
                const message = newMessage.content;
                const profile: string = String(companyLists?.find((item) => item._id === newMessage.sender)?.icon);

                const notificationMessage = `${sender}: ${message}`;
                setNotification({ message: notificationMessage, profile });
                setOpen(true);
            }

            if (newMessage.sender === innerChat.id ) {
                setInnerChat((prev) => ({
                    ...prev,
                    messages: [...prev.messages, newMessage]
                }));
            }
            

            if (newMessage.sender === innerChat.id) {
                socket?.emit('read message', readDatas);
            }
        });

        return () => {
            socket?.off("message recieved");
        };
    }, [innerChat, user, companyLists, readDatas, socket]);

    const sendMessage = async (receiver: string) => {
        if (message.trim() === "") {
            toast({
                description: "Please enter message",
                className: "bg-red-600 text-white"
            });
            return;
        }
        

        const data = {
            sender: user?._id,
            receiver: receiver,
            content: message,
            type: "text"
        };

        try {
            const res = await axios.post(`${BASE_URL}chat/company/sendmessage`, data, { withCredentials: true });
            axios.get(`${BASE_URL}chat/company/getmessage?id=${readDatas.id}`).then((res: any) => {
                setIsNew(false)
                setInnerChat((prev) => ({
                    ...prev,
                    messages: res.data.user.message
                }))

            })
            const newMessage = res.data.user;
            console.log(newMessage,"new message in company")
            socket?.emit("new message", { data: newMessage, chatId });
 
            setMessage("");
            dispatch(allMessageList(String(user?._id)));

            const chatfind = chatList?.find((item) =>
                item.participants.includes(newMessage.sender) && item.participants.includes(newMessage.receiver)
            );

            const chatfilter = chatList?.filter((item: IChat) =>
                !(item.participants.includes(newMessage.sender) && item.participants.includes(newMessage.receiver))
            );

            if (chatfind) {
                chatfilter?.unshift(chatfind);
            }

            if (chatfilter) {
                setChatList(chatfilter);
            }
        } catch (error) {
            console.error('Error in sending message:', error);
        }
    };

    const handleChatDetails = async (data: any) => {
        const { id, name, profile, userid, chatIds } = data;
        setChatId(id);
        socket?.emit("join chat", id);

        const datas = { id: id, sender: userid, chatId: chatIds, receiver: user?._id, status: "read" };
        setReadDatas({ ...datas, chatIds });
        socket?.emit('read message', datas);

        try {
            const res = await axios.get(`${BASE_URL}chat/company/getmessage?id=${id}`);
            setIsNew(false);
            setInnerChat((prev) => ({
                ...prev,
                id: userid,
                name: name,
                profile: profile,
                messages: res.data.user.message
            }));
        } catch (error) {
            console.error('Error in fetching chat details:', error);
        }
    };


    const handleEmojiClick = (e: any) => {
        setMessage((prev) => prev + e.emoji);
    };

    const handleClose = (_: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleVideoCall = () => {
        navigate(`/company/videocall?id=${innerChat.id}&senderId=${innerChat?.id}`);
    };
    useEffect(() => {
        socket?.on('updated message', async (id: string,receiver:string,sender:string) => {
            if(receiver==user?._id&&sender==innerChat.id){

                await axios.get(`${BASE_URL}chat/company/getmessage?id=${id}`).then((res) => {
                    console.log("updation done")
                    setIsNew(false)
                    setInnerChat((prev) => ({
                        ...prev,
                        messages: res.data.user.message
                    }))
    
                })
            }
        })
    }, [])

    return (
        <>
            {emoji && (

                <div className="absolute top-1 right-4 z-20">

                    <EmojiPicker onEmojiClick={(e) => handleEmojiClick(e)} />
                </div>
            )}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert

                    severity="info"
                    icon={notification.profile ? <Avatar src={notification.profile} alt="Profile Icon" style={{ width: '24px', height: '24px' }} /> : undefined}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
            <div className="w-full flex flex-col h-screen">
                <UserHeader prop="Messages" />
                <div className="w-full flex h-[90%] bg-red-300">
                    <div className="w-[30%] h-full bg-white flex flex-col border">
                        <div className="w-full h-[10%] flex justify-center items-center p-2">
                            <div className="w-[90%] rounded border border-gray-300 h-[70%] flex justify-between items-center pl-2">
                                <BiSearch className="text-2xl" />
                                <input type="text" className="w-[95%] h-[90%] outline-none" placeholder="Search..." />
                            </div>
                        </div>
                        <div className="max-h-[90%] w-full flex flex-col items-center overflow-y-auto">
                            {chatList?.map((chat, index) => {
                                const participantsIds = chat?.participants?.filter(id => id !== user?._id);
                                const participant = companyLists?.find(company => company?._id === participantsIds[0]);
                                const online = onlineUsers?.includes(String(participant?._id))

                                const chatMessages = allMessages?.filter(message => {
                                    return message?.participants &&
                                        message?.participants?.includes(String(user?._id)) &&
                                        message?.participants?.includes(participantsIds[0]) &&
                                        message?.participants?.length === 2;
                                }) ?? [];

                                const lastMessage = chatMessages?.length > 0 ? chatMessages[chatMessages?.length - 1] : null;

                                return (
                                    <div key={index} className="w-[95%] h-16 border-b border-black flex items-center p-1 cursor-pointer" onClick={() => handleChatDetails({
                                        name: participant?.company_name,
                                        profile: participant?.icon,
                                        chatIds: chat._id,
                                        id: chat._id,
                                        userid: participant?._id
                                    })}>
                                        <div className="w-14 h-14 rounded-full flex flex-col">
                                            <img src={participant?.icon} alt="" className="w-full h-full rounded-full" />
                                        </div>
                                        {online ? (

                                            <GoDotFill className="text-green-600" />
                                        ) : (
                                            <GoDotFill className="text-red-600" />
                                        )}
                                        <div className="w-[85%] h-full flex flex-col">
                                            <div className="w-full h-[50%] flex justify-between pl-2 pr-2 items-center">
                                                <span className="font-bold">{participant?.company_name}</span>
                                                <time className="text-xs opacity-50">{lastMessage?.message[lastMessage?.message?.length - 1] ? new Date(Number(lastMessage?.message[lastMessage?.message?.length - 1]?.createdAt)).toLocaleString() : ''}</time>
                                            </div>
                                            <div className="w-full h-[50%] flex items-center pl-2 pr-2 overflow-hidden">
                                                <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {lastMessage?.message[lastMessage?.message?.length - 1] ? lastMessage?.message[lastMessage?.message?.length - 1]?.content : 'No messages yet'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}






                        </div>
                    </div>
                    <div className="w-[70%] h-full bg-white flex flex-col">
                        {isnew ? (
                            <div className="w-full h-full flex justify-center items-center bg-gray-300">
                                <img src={newImg} alt="New Content" className="max-w-full max-h-full " />
                            </div>
                        ) : (
                            <>
                                <div className="w-full h-[20%] flex border-b border-r border-t border-gray-300">
                                    <div className="w-[20%] h-full flex justify-center items-center">
                                        <div className="w-24 h-24 rounded-full bg-black">
                                            <img src={innerChat?.profile} alt="" className="w-full h-full rounded-full" />
                                        </div>
                                    </div>
                                    <div className="w-[40%] h-full flex flex-col justify-center">
                                        <span className="font-bold">{innerChat.name}</span>
                                        <span>Recruiter at {innerChat?.name}</span>
                                    </div>
                                    <div className="w-[40%] h-full flex justify-end p-4 gap-2 items-center">
                                        {user?.subscription.subscriptionId && (

                                            <BsCameraVideo onClick={() => handleVideoCall()} className="text-xl cursor-pointer" />
                                        )}
                                        <TiPinOutline className="text-xl cursor-pointer" />
                                        <TiStarOutline className="text-xl cursor-pointer" />
                                        <CiMenuKebab className="text-xl cursor-pointer" />
                                    </div>
                                </div>
                                {!innerChat?.messages?.length ? (
                                    <>
                                        <div className="w-full h-full flex flex-col justify-center items-center ">
                                            <img src={nochat} alt="" className="" />
                                            <span>No Messages...</span>
                                        </div>
                                    </>
                                ) : (
                                    <div ref={messageBoxRef} className="w-full h-[70%] space-y-6 p-4 overflow-y-auto">

                                        {innerChat?.messages?.map((message) => (
                                            <div key={message?._id} className={`chat ${message?.sender === user?._id ? "chat-end" : "chat-start"}`}>
                                                <div className="chat-image avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img
                                                            alt="User avatar"
                                                            src={message?.sender === user?._id ? user?.profile : innerChat?.profile}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="chat-header">
                                                    {message?.sender === user?._id ? "You" : innerChat?.name}
                                                    <time className="text-xs opacity-50 ml-2">{new Date(Number(message?.createdAt)).toLocaleTimeString()}</time>
                                                </div>
                                                <div className="chat-bubble">{message?.content}</div>
                                                {message?.sender == user?._id && (
                                                    <>
                                                        {message?.status == "sent" && (
                                                            <>
                                                                <IoCheckmarkOutline />
                                                            </>
                                                        )}
                                                        {message?.status == "delivered" && (
                                                            <>
                                                                <LuCheckCheck />
                                                            </>
                                                        )}
                                                        {message?.status == "read" && (
                                                            <>
                                                                <LuCheckCheck />
                                                            </>
                                                        )}
                                                    </>

                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="w-full h-[10%] flex justify-center items-center p-2">
                                    <div className="w-[95%] h-[80%] rounded border border-gray-300 flex items-center">
                                        <div className="w-[8%] h-full flex justify-center items-center">
                                            <GoPaperclip className="text-2xl cursor-pointer" />
                                        </div>
                                        <div className="w-[80%] h-full">
                                            <input
                                                onChange={(e) => setMessage(e.target.value)}
                                                value={message}
                                                className="w-full h-full p-2 outline-none"
                                                placeholder="Reply message..."
                                            />
                                        </div>
                                        <div className="w-[12%] h-full justify-end pr-1 flex gap-2 items-center">
                                            <GrEmoji onClick={() => setEmoji(!emoji)} className="text-2xl cursor-pointer" />
                                            <button onClick={() => sendMessage(String(innerChat.id))} className="p-4 flex justify-center items-center rounded bg-customviolet h-[80%]">
                                                <FiSend className="text-xl text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

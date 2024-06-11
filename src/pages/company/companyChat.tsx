import { UserHeader } from "@/components/user/header"
import { BiSearch } from "react-icons/bi"
import { BsCameraVideo } from "react-icons/bs";
import { TiPinOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { CiMenuKebab } from "react-icons/ci";
import { GoPaperclip } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import newImg from '../../assets/images/newchat.png'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ChatList, UlistUsers, allMessageList } from "@/redux/actions/userAction";
import { IChat, IMessage } from "@/interfaces/IUser";
import axios from "axios";
import { BASE_URL } from "@/interfaces/config/constant";
import { useToast } from "@/components/ui/use-toast";
import { useSocketContext } from "@/assets/context/socketContext";


export const CompanyChat = () => {
    const { socket } = useSocketContext()
    const dispatch = useDispatch<AppDispatch>()
    const { toast } = useToast()
    const { data: allMessages } = useSelector((state: RootState) => state.allMessage)
    const { data: companyData } = useSelector((state: RootState) => state.company)
    const { data: userList } = useSelector((state: RootState) => state.usersList)
    const { data } = useSelector((state: RootState) => state.chat)
    const [isnew, setIsNew] = useState(true);
    const [chatList, setChatList] = useState<IChat[]>()
    const [chatId, setChatId] = useState<string>()
    const messageBoxRef = useRef<HTMLDivElement | null>(null);
    const [innerChat, setInnerChat] = useState({
        id: "",
        name: "",
        profile: "",
        messages: [] as IMessage[]
    })

    const [message, setMessage] = useState("")
    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [innerChat]);

    useEffect(() => {
        dispatch(ChatList(String(companyData?._id))).then(() => {

            setChatList(data as IChat[])
        })
        dispatch(UlistUsers())
        dispatch(allMessageList(String(companyData?._id)))


    }, [])
    useEffect(() => {

        socket?.on("message recieved", (newMessage: IMessage) => {

            setInnerChat((prev) => ({
                ...prev,
                messages: [...innerChat.messages, newMessage]
            }))

        })
    }, [innerChat])
    const sendMessage = async (receiver: string) => {
        
        if (message.trim() == "") {
            toast({
                description: "Please enter message",
                className: "bg-red-600 text-white"

            })
            return
        }
        const data = {
            sender: companyData?._id,
            receiver: receiver,
            content: message,
            type: "text"

        }

        await axios.post(`${BASE_URL}chat/company/sendmessage`, data, { withCredentials: true }).then((res) => {
            console.log(res, "res from send message")
            const data = res.data.user
            socket?.emit("new message", ({ data, chatId }))
            setMessage("")
            dispatch(allMessageList(String(companyData?._id)))

        })
    }

    const handleChatDetails = async (data: any) => {
        const { id, name, profile,userid } = data
        setChatId(id);
        socket?.emit("join chat",(id))
        await axios.get(`${BASE_URL}chat/company/getmessage?id=${id}`).then((res) => {
            setIsNew(false)
            setInnerChat((prev) => ({
                ...prev,
                id:userid,
                name: name,
                profile: profile,
                messages: res.data.user.message
            }))
            console.log(res.data.user, "daatatatatatatat")
        })

    }
    return (
        <>
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
                                const participantsIds = chat.participants.filter(id => id !== companyData?._id);
                                const participant = userList?.find(company => company._id === participantsIds[0]);


                                const chatMessages = allMessages?.filter(message => {

                                    return message?.participants &&
                                        message?.participants.includes(String(companyData?._id)) &&
                                        message?.participants.includes(participantsIds[0]) &&
                                        message?.participants.length === 2;
                                }) ?? [];



                                const lastMessage = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1] : null;


                                return (
                                    <div key={index} className="w-[95%] h-16 border-b border-black flex items-center p-1 cursor-pointer" onClick={() => handleChatDetails({
                                        name: participant?.username,
                                        profile: participant?.profile,
                                        id: lastMessage?._id,
                                        userid: participant?._id
                                    })}>
                                        <div className="w-12 h-12 rounded-full">
                                            <img src={participant?.profile} alt="" className="w-full h-full rounded-full object-cover" />
                                        </div>
                                        <div className="w-[85%] h-full flex flex-col">
                                            <div className="w-full h-[50%] flex justify-between pl-2 pr-2 items-center">
                                                <span className="font-bold">{participant?.username}</span>

                                                <time className="text-xs opacity-50">{lastMessage?.message[lastMessage?.message?.length-1] ? new Date(Number(lastMessage.message[lastMessage?.message?.length-1].createdAt)).toLocaleString() : ''}</time>
                                            </div>
                                            <div className="w-full h-[50%] flex items-center pl-2 pr-2 overflow-hidden">
                                                <span className="text-sm  overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {lastMessage?.message[lastMessage?.message?.length-1] ? lastMessage?.message[lastMessage?.message?.length-1]?.content : 'No messages yet'}
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
                            <div className="w-full h-full flex justify-center items-center">
                                <img src={newImg} alt="New Content" className="max-w-full max-h-full object-cover" />
                            </div>
                        ) : (
                            <>
                                <div className="w-full h-[20%] flex border-b border-r border-t border-gray-300">
                                    <div className="w-[20%] h-full flex justify-center items-center">
                                        <div className="w-24 h-24 rounded-full bg-black">
                                            <img src={innerChat.profile} alt="" className="w-full h-full rounded-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="w-[40%] h-full flex flex-col justify-center">
                                        <span className="font-bold">{innerChat.name}</span>
                                        <span>Job seeker</span>
                                    </div>
                                    <div className="w-[40%] h-full flex justify-end p-4 gap-2 items-center">
                                        <BsCameraVideo className="text-xl" />
                                        <TiPinOutline className="text-xl" />
                                        <TiStarOutline className="text-xl" />
                                        <CiMenuKebab className="text-xl" />
                                    </div>
                                </div>
                                <div  ref={messageBoxRef}  className="w-full h-[70%] space-y-6 p-4 overflow-y-auto">

                                    {innerChat.messages?.map((message) => (
                                        <div key={message?._id} className={`chat ${message?.sender === companyData?._id ? "chat-end" : "chat-start"}`}>
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full">
                                                    <img
                                                        alt="User avatar"
                                                        src={message.sender === companyData?._id ? companyData.icon : innerChat.profile}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="chat-header">
                                                {message.sender === companyData?._id ? "You" : innerChat.name}
                                                <time className="text-xs opacity-50 ml-2">{new Date(Number(message.createdAt)).toLocaleTimeString()}</time>
                                            </div>
                                            <div className="chat-bubble">{message.content}</div>
                                            {message.sender == companyData?._id && (

                                                <div className="chat-footer opacity-50">{message.status.charAt(0).toUpperCase() + message.status.slice(1)}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full h-[10%] flex justify-center items-center p-2">
                                    <div className="w-[95%] h-[80%] rounded border border-gray-300 flex items-center">
                                        <div className="w-[8%] h-full flex justify-center items-center">
                                            <GoPaperclip className="text-2xl" />
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
                                            <GrEmoji className="text-2xl" />
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

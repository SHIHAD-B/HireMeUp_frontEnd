
import {  RootState } from "@/redux/store";
import { profileTwoValidation } from "@/utils/validations/user/profileTwoValidation";
import { useState } from "react";
import { GiSevenPointedStar } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { BASE_URL } from "@/interfaces/config/constant";



export const Profiletwo = () => {

   
    const { toast } = useToast()
    const { user } = useSelector((state: RootState) => state.user)

    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
        newPassword: ""

    })

    const [error, setError] = useState({
        password: "",
        confirmPassword: "",
        newPassword: ""

    })

    const handleChange = (e: any) => {
        const { name, value } = e.target

        setData((prev: any) => ({
            ...prev,
            [name]: value
        }))
        setError((prev: any) => ({
            ...prev,
            [name]: ""
        }))
    }


    const handleSubmit = async () => {
        try {
            setError({
                password: "",
                confirmPassword: "",
                newPassword: ""
            });


            await profileTwoValidation.validate(data, { abortEarly: false });




            console.log(data, "Validation successful");

            const sendData = {
                password: data.password,
                newPassword: data.newPassword,
                email: user?.email
            }

            await axios.patch(`${BASE_URL}user/profileresetpassword`, sendData,{withCredentials:true}).then((res: any) => {
                console.log(res, "res from reset pass")
                setError({
                    password: "",
                    confirmPassword: "",
                    newPassword: ""
                })
                setData({
                    password: "",
                    confirmPassword: "",
                    newPassword: ""
                })
                toast({
                    description: "password changed successfully...",
                    className: "bg-green-500 text-white rounded"
                });
            }).catch((error: any) => {
                setError((prev: any) => ({
                    ...prev,
                    password: error.response.data.message
                }))
                toast({
                    description: "incorrect password ! Please try again..",
                    className: "bg-red-500 text-white rounded"
                });
                console.log(error.response.data.message, "error in resettin password")
            })

        } catch (error: any) {
            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            console.error("Validation failed:", errors);

            const errorsss = {
                password: errors.password,
                confirmPassword: errors.confirmPassword,
                newPassword: errors.newPassword,
            }

            setError((prev: any) => ({
                ...prev,
                ...errorsss
            }));
        }
    };



    return (
        <>
            <div className="w-full flex-col">
                <div className="w-full h-14 pl-2 flex-col flex  border-b border-gray-200 justify-center">
                    <span className="font-bold">Basic Information</span>
                    <span className="text-gray-400 text-sm">This is login information that you can update anytime.</span>
                </div>
                <div className="w-full h-[200px] border-b border-gray-200  lg:h-56 pl-2 flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2  h-full flex justify-between items-center pt-2">
                        <div className="w-1/2 flex flex-col">
                            <span className='font-bold'>Email</span>
                            <span className='text-sm text-gray-400'>email address can't change at this time</span>
                        </div>
                        <div className=" w- h-52 rounded-full flex flex-col items-center justify-center">
                            <span className='font-bold flex items-center gap-2'>{user?.email}<MdOutlineVerified className="text-green-400 text-xl" /></span>
                            <span>Your email address is verified.</span>
                        </div>
                    </div>


                </div>

                <div className='w-full flex pt-4 flex-col lg:flex-row  border-b border-gray-200'>
                    <div className='h-full w-full lg:w-1/4 pl-2'>
                        <span className='font-bold'>Personal Details</span>
                    </div>
                    <div className='w-full m-2 lg:w-2/5 flex flex-col gap-6'>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>Old Password<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="password" onChange={handleChange} name="password" value={data.password} className='w-full bg-background border rounded border-gray-400 h-10' />
                            <p className="text-xs text-red-400 ">{error.password}</p>
                            <p className="text-xs text-gray-400">Minimum 8 character</p>
                        </div>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>New Password<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="password" onChange={handleChange} name="newPassword" value={data.newPassword} className='w-full border bg-background rounded border-gray-400 h-10' />
                            <p className="text-xs text-red-400">{error.newPassword}</p>
                            <p className="text-xs text-gray-400">Minimum 8 character</p>
                        </div>
                        <div className='1/4 flex flex-col gap-2'>
                            <span className='flex '>Confirm Pasword<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="password" onChange={handleChange} name="confirmPassword" value={data.confirmPassword} className='w-full border bg-background rounded border-gray-400 h-10' />
                            <p className="text-xs text-red-400">{error.confirmPassword}</p>
                            <p className="text-xs text-gray-400">Minimum 8 character</p>
                        </div>


                    </div>
                </div>
                <div className='w-full flex justify-end pr-6 mt-10 pb-2'>
                    <button onClick={handleSubmit} className='p-2 border rounded text-white bg-customviolet hover:bg-white hover:text-customviolet'>Change Password</button>
                </div>

            </div>
        </>
    )
}
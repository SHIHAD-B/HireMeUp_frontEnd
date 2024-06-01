import { useState } from "react"
import { ProfileOne } from "@/components/user/profileOne"
import { Profiletwo } from "@/components/user/ProfileTwo"
import { ProfileThree } from "@/components/user/profileThree"
import { UserHeader } from "@/components/user/header"


export const Setting = () => {

const [page,setPage]=useState("profile")

    return (
        <>
            <div className="w-full flex flex-col ">
                <UserHeader prop="Settings"/>
                <div className="pl-2 h-16 w-full flex gap-10 items-center  border-b border-gray-200">
                    <span onClick={()=>setPage("profile")} className={`text-sm font-bold ${page=="profile"&&"border-customviolet border-b-4 "}  cursor-pointer`}>My Profile</span>
                    <span onClick={()=>setPage("login")} className={`text-sm font-bold ${page=="login"&&"border-customviolet border-b-4 "} cursor-pointer`}>Login Details</span>
                    <span onClick={()=>setPage("notification")} className={`text-sm font-bold ${page=="notification"&&"border-customviolet border-b-4 "} cursor-pointer`}>Notification</span>
                </div>
                {page=="profile"&&<ProfileOne/>}
                {page=="login"&&<Profiletwo/>}
                {page=="notification"&&<ProfileThree/>}
                
            </div>
        </>
    )
}
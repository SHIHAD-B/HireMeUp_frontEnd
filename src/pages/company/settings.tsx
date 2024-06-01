import { useState } from "react"


import { CompanyHeader } from "@/components/company/header"
import { SetProfileOne } from "@/components/company/setProfileOne"
import { SetProfiletwo } from "@/components/company/setProfileTwo"
import { SetProfileThree } from "@/components/company/setProfileThree"


export const AdminSetting = () => {

const [page,setPage]=useState("overview")

    return (
        <>
            <div className="w-full flex flex-col ">
                <CompanyHeader/>
                <div className="h-[70px]  border-b border-gray-200 flex items-center pl-2">
                    <span className="text-xl font-bold">Settings</span>
                </div>
                <div className="pl-2 h-16 w-full flex gap-10 items-center  border-b border-gray-200">
                    <span onClick={()=>setPage("overview")} className={`text-sm font-bold ${page=="overview"&&"border-customviolet border-b-4 "}  cursor-pointer`}>Overview</span>
                    <span onClick={()=>setPage("social")} className={`text-sm font-bold ${page=="social"&&"border-customviolet border-b-4 "} cursor-pointer`}>Social Links</span>
                    <span onClick={()=>setPage("login")} className={`text-sm font-bold ${page=="login"&&"border-customviolet border-b-4 "} cursor-pointer`}>Login</span>
                </div>
                {page=="overview"&&<SetProfileOne/>}
                {page=="social"&&<SetProfiletwo/>}
                {page=="login"&&<SetProfileThree/>}
                
            </div>
        </>
    )
}
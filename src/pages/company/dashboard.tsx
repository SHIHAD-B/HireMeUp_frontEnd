import { CompanySideBar } from "@/components/company/companySideBar";
import { CompanyHeader } from "@/components/company/header";


export const CompanyDashboard = () => {

    return (
        <>
            <div className="flex">
                <CompanySideBar />
                <div className="w-[85%]">
                    <CompanyHeader/>
                <span>Home</span>
                </div>
            </div>
        </>
    )
}
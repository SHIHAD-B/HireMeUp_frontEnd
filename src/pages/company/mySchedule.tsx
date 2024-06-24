
import { ChartsOverviewYear } from "@/components/company/YearGraph";
import { CompanyCalendar } from "@/components/company/companyCalendar";
import { ChartsOverviewDay } from "@/components/company/dayGraph";
import { CompanyHeader } from "@/components/company/header";
import { ChartsOverviewMonth } from "@/components/company/monthGraph";
import { companyApplicantList, employeeList } from "@/redux/actions/companyAction";
import { fecthJob } from "@/redux/actions/jobAction";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { CiMemoPad } from "react-icons/ci";
import { MdPinEnd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";


export const CompanySchedule = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { data } = useSelector((state: RootState) => state.company)
    const {  data:applicants }: any = useSelector((state: RootState) => state.applicantList)
    const { data: employees } = useSelector((state: RootState) => state.employee)
    const { data:jobs }: any = useSelector((state: RootState) => state.job)
    const [graphPage,setGraphPage]=useState("week")
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(employeeList());
            await dispatch(fecthJob(data?._id));
            await dispatch(companyApplicantList(String(data?._id)))
        };

        fetchData();
    }, [dispatch]);
    return (
        <>
            <div className="w-full">
                <div className="w-full">
                    <CompanyHeader />

                    <div className="w-full p-10 ">
                       <CompanyCalendar />        
                    </div>
                </div>
            </div>
        </>
    )
}
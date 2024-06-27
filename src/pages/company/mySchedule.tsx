
import { CompanyCalendar } from "@/components/company/companyCalendar";
import { CompanyHeader } from "@/components/company/header";
import { companyApplicantList, employeeList } from "@/redux/actions/companyAction";
import { fecthJob } from "@/redux/actions/jobAction";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export const CompanySchedule = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { data } = useSelector((state: RootState) => state.company)
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
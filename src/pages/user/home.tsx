import PieChartComponent from "../../components/user/userChart";
import Schedule from "../../components/user/calendar";
import { FaRegFileAlt } from "react-icons/fa";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { UserHeader } from "@/components/user/header";
import { useEffect } from "react";
import { userApplicantList } from "@/redux/actions/userAction";


export const Home = () => {
    const dispatch = useDispatch<AppDispatch>()

    const data = useSelector((state: RootState) => state.user)
    const { data: applicants } = useSelector((state: RootState) => state.applicantList);
 
    useEffect(()=>{
        const execute = async () => {

            await dispatch(userApplicantList(String(data?.user?._id)))
        }
        execute()
    },[])
    return (
        <div className="w-full h-auto flex-col">
            <div className="w-full h-auto flex">
                <div className="flex-1 h-auto bg-violete-50 flex flex-col pl-2">
                    <UserHeader prop="Dashboard" />
                    <div className="h-[100px] flex flex-col pl-2 justify-center">
                        <span className="text-lg font-semibold">Welcome {data.user?.username} . Explore, discover, and enjoy! </span>
                        <span>Here is what's happened with your job search applications</span>
                    </div>
                    <div className="lg:flex-row flex-col flex  gap-4 flex-1 pr-2 mt-4 lg:mt-0">
                        <div className="lg:w-2/5 w-full h-full  flex flex-col items-center gap-4 ">
                            <div className="w-full lg:h-[60%] h-[60%] border border-gray-400">
                                <span className="w-full ml-2 font-semibold">Job applied status</span>
                                <PieChartComponent />
                            </div>
                            <div className="w-full h-[48%]  flex  gap-2">
                                <div className="w-full h-[100%]  border border-gray-400 flex-col">
                                    <span className="w-full ml-2 font-semibold">Total Jobs Applied</span>
                                    <div className="w-full h-[80%]  flex">
                                        <div className="w-[50%] h-full  flex justify-center items-center">
                                            <span className="text-8xl font-bold">{applicants?.length}</span>
                                        </div>
                                        <div className="w-[50%] h-full  flex justify-end items-end ">
                                            <FaRegFileAlt className="text-8xl text-gray-400 " />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-auto  border border-gray-400 flex-col">
                                    <span className="w-full ml-2 font-semibold">Interviews</span>
                                    <div className="w-full h-[80%]  flex">
                                        <div className="w-[50%] h-full  flex justify-center items-center">
                                            <span className="text-8xl font-bold">{applicants?.filter((item:any)=>item.hiring_status=="interview").length}</span>
                                        </div>
                                        <div className="w-[50%] h-full  flex justify-end items-end ">
                                            <BsFillPatchQuestionFill className="text-8xl text-gray-400 mr-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block lg:w-3/5 w-full h-full border border-gray-400 mr-4 mb-4">
                            <Schedule />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

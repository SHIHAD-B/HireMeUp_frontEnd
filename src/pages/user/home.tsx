import PieChartComponent from "../../components/user/userChart";
import Schedule from "../../components/user/calendar";
import { FaRegFileAlt } from "react-icons/fa";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


export const Home = () => {

    const data = useSelector((state: RootState) => state.user)


    return (
        <div className="w-full h-auto flex-col">
            <div className="w-full h-auto flex">
                <div className="flex-1 h-auto bg-violete-50 flex flex-col pl-2">
                    <div className="h-[70px]  border-b border-gray-200 flex items-center pl-2">
                        <span className="text-xl font-bold">Dashboard</span>
                    </div>
                    <div className="h-[100px] flex flex-col pl-2 justify-center">
                        <span className="text-lg font-semibold">Welcome {data.user?.username} . Explore, discover, and enjoy! </span>
                        <span>Here is what's happened with your job search applications</span>
                    </div>
                    <div className="flex gap-4 flex-1 pr-2">
                        <div className="w-2/5 h-full  flex flex-col items-center gap-4 ">
                            <div className="w-full h-[60%] border border-gray-400">
                                <span className="w-full ml-2 font-semibold">Job applied status</span>
                                <PieChartComponent />
                            </div>
                            <div className="w-full h-[48%]  flex  gap-2">
                                <div className="w-full h-[100%]  border border-gray-400 flex-col">
                                    <span className="w-full ml-2 font-semibold">Total Jobs Applied</span>
                                    <div className="w-full h-[80%]  flex">
                                        <div className="w-[50%] h-full  flex justify-center items-center">
                                            <span className="text-8xl font-bold">45</span>
                                        </div>
                                        <div className="w-[50%] h-full  flex justify-end items-end ">
                                            <FaRegFileAlt className="text-8xl text-gray-400 " />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-auto  border border-gray-400 flex-col">
                                    <span className="w-full ml-2 font-semibold">Interviewed</span>
                                    <div className="w-full h-[80%]  flex">
                                        <div className="w-[50%] h-full  flex justify-center items-center">
                                            <span className="text-8xl font-bold">18</span>
                                        </div>
                                        <div className="w-[50%] h-full  flex justify-end items-end ">
                                            <BsFillPatchQuestionFill className="text-8xl text-gray-400 mr-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/5 h-full border border-gray-400 mr-4 mb-4">
                            <Schedule />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

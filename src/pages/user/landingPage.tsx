import { Unauth_header } from "../../components/user/unauth-header"
import { Footer } from "../../components/user/footer";
import lanimg from '../../assets/images/hero_img.webp'
import { RiSearchLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineDesignServices } from "react-icons/md";
import { TbChartInfographic } from "react-icons/tb";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { TbCash } from "react-icons/tb";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FaCode } from "react-icons/fa6";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { LiaIndustrySolid } from "react-icons/lia";
import { HiOutlineLightBulb } from "react-icons/hi";

export const LandingPage = () => {
    return (
        <>
            <div className="h-auto w-full bg-slate-100">
                < Unauth_header />
                <div className="w-full min-h-[300px] md:h-[550px] md:flex ">
                    <div className=" md:w-[50%] h-full flex  justify-center items-center">
                        <div className="flex flex-col">
                            <span className="font-finger text-4xl md:text-7xl">EXPLORE </span>
                            <span className="font-finger text-4xl md:text-7xl">LIMITLESS </span>
                            <span className="font-finger text-4xl md:text-7xl">OPPURTUNITIES... </span>

                        </div>
                    </div>
                    <div className="md:w-[50%] h-full flex justify-center items-center ">
                        <img src={lanimg} alt="" className="h-[30%] md:h-[90%] w-[70%] md:w-auto" />
                    </div>
                </div>
                <div className=" ml-2 md:ml-14   h-auto">
                    <span className="text-xl">"Embark on Your Career Adventure: A Premier Platform for Job Seekers with a Passion for Startup Success!"</span>
                </div>
                <div className="w-full h-14  md:pl-14 pl-2 mt-3">
                    <div className="w-full md:w-[60%]  h-full rounded-xl bg-slate-100 shadow-xl flex justify-between items-center">
                        <div className="w-[33%] h-full flex justify-center items-center gap-2">
                            <RiSearchLine />
                            <input value={"search here..."} className="flex  bg-gray-200 w-[250px] h-10 rounded-l shadow-xl border border-gray-100 " />
                        </div>
                        <div className="w-[33%] h-full flex justify-center items-center gap-1">
                            <IoLocationOutline />
                            <div className="flex bg-gray-200 w-[250px] h-10 rounded-l shadow-xl border border-gray-100">
                                <select className="h-full rounded-l w-full">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                    <option value="option3">Option 3</option>
                                    <option value="option3">Option 3</option>
                                    <option value="option3">Option 3</option>
                                    <option value="option3">Option 3</option>
                                </select>

                            </div>
                        </div>



                        <div className="w-[33%] h-full flex justify-center items-center gap-1">
                            <button className="md:block hidden text-bold text-white bg-customviolet h-10 w-36 rounded-lg hover:rounded-2xl transition-all duration-100">Search my job</button>
                            <button className="md:hidden block text-bold text-white bg-customviolet h-10 w-28 rounded-lg hover:rounded-2xl transition-all duration-100">Search</button>
                        </div>

                    </div>
                </div>
                <div className="w-full md:h-56 h-28 flex justify-between  ">
                    <div className="md:w-[60%] w-[85%] h-full flex  gap-2 items-center md:pl-14 p-2 ">
                        <span className="md:text-5xl text-2xl font-bold">Discover by </span>
                        <span className="md:text-5xl text-2xl font-bold text-customviolet">Category</span>
                        <span className="md:text-5xl text-2xl font-bold">Explore now</span>

                    </div>
                    <div className="md:w-[40%] w-[15%] h-full flex justify-end items-center md:pr-14 pr-2 ">
                        <span className="flex items-center gap-1 font-bold text-customviolet cursor-pointer">Show all jobs <FaArrowRight /></span>
                    </div>
                </div>

                <div className=" h-auto  w-full  flex flex-col gap-5  items-center justify-center pr-14 pl-14 ">
                    <div className="flex flex-wrap md:gap-32 gap-6 ">
                        <div className="md:h-64 md:w-64 h-[170px] w-[170px] rounded-xl border border-gray-400 bg-white flex flex-col justify-center items-start md:gap-6 md:pl-10 pl-4 hover:bg-customviolet group">
                            <MdOutlineDesignServices className="text-customviolet text-4xl md:text-6xl group-hover:text-white" />
                            <span className="md:text-4xl text-2xl font-bold group-hover:text-white">Design</span>
                            <span className="flex justify-center items-center md:gap-2 font-bold group-hover:text-white">234 jobs available <FaArrowRight /></span>
                        </div>
                        <div className="md:h-64 md:w-64 h-[170px] w-[170px] rounded-xl border border-gray-400 bg-white flex flex-col justify-center items-start md:gap-6 md:pl-10 pl-4 hover:bg-customviolet group">
                            <TbChartInfographic className="text-customviolet text-4xl md:text-6xl group-hover:text-white" />
                            <span className="md:text-4xl text-2xl font-bold group-hover:text-white">Sales</span>
                            <span className="flex justify-center items-center md:gap-2 font-bold group-hover:text-white">234 jobs available <FaArrowRight /></span>
                        </div>
                        <div className="md:h-64 md:w-64 h-[170px] w-[170px] rounded-xl border border-gray-400 bg-white flex flex-col justify-center items-start md:gap-6 md:pl-10 pl-4 hover:bg-customviolet group">
                            <HiOutlineSpeakerphone className="text-customviolet text-4xl md:text-6xl group-hover:text-white" />
                            <span className="md:text-4xl text-2xl font-bold group-hover:text-white">Marketing</span>
                            <span className="flex justify-center items-center md:gap-2 font-bold group-hover:text-white">234 jobs available <FaArrowRight /></span>
                        </div>
                        <div className="md:h-64 md:w-64 h-[170px] w-[170px] rounded-xl border border-gray-400 bg-white flex flex-col justify-center items-start md:gap-6 md:pl-10 pl-4 hover:bg-customviolet group">
                            <TbCash className="text-customviolet text-4xl md:text-6xl group-hover:text-white" />
                            <span className="md:text-4xl text-2xl font-bold group-hover:text-white">Finance</span>
                            <span className="flex justify-center items-center md:gap-2 font-bold group-hover:text-white">234 jobs available <FaArrowRight /></span>
                        </div>
                        <div className="md:h-64 md:w-64 h-[170px] w-[170px] rounded-xl border border-gray-400 bg-white flex flex-col justify-center items-start md:gap-6 md:pl-10 pl-4 hover:bg-customviolet group">
                            <HiOutlineDesktopComputer className="text-customviolet text-4xl md:text-6xl group-hover:text-white" />
                            <span className="md:text-4xl text-2xl font-bold group-hover:text-white">Technology</span>
                            <span className="flex justify-center items-center md:gap-2 font-bold group-hover:text-white">234 jobs available <FaArrowRight /></span>
                        </div>
                        <div className="md:h-64 md:w-64 h-[170px] w-[170px] rounded-xl border border-gray-400 bg-white flex flex-col justify-center items-start md:gap-6 md:pl-10 pl-4 hover:bg-customviolet group">
                            <FaCode className="text-customviolet text-4xl md:text-6xl group-hover:text-white" />
                            <span className="md:text-4xl text-2xl font-bold group-hover:text-white">Engineering</span>
                            <span className="flex justify-center items-center md:gap-2 font-bold group-hover:text-white">234 jobs available <FaArrowRight /></span>
                        </div>
                        <div className="md:h-64 md:w-64 h-[170px] w-[170px] rounded-xl border border-gray-400 bg-white flex flex-col justify-center items-start md:gap-6 md:pl-10 pl-4 hover:bg-customviolet group">
                            <MdOutlineBusinessCenter className="text-customviolet text-4xl md:text-6xl group-hover:text-white" />
                            <span className="md:text-4xl text-2xl font-bold group-hover:text-white">Business</span>
                            <span className="flex justify-center items-center md:gap-2 font-bold group-hover:text-white">234 jobs available <FaArrowRight /></span>
                        </div>
                        <div className="md:h-64 md:w-64 h-[170px] w-[170px] rounded-xl border border-gray-400 bg-white flex flex-col justify-center items-start md:gap-6 md:pl-10 pl-4 hover:bg-customviolet group">
                            <HiMiniUserGroup className="text-customviolet text-4xl md:text-6xl group-hover:text-white" />
                            <span className="md:text-4xl text-2xl font-bold group-hover:text-white">Human Resource</span>
                            <span className="flex justify-center items-center md:gap-2 font-bold group-hover:text-white">234 jobs available <FaArrowRight /></span>
                        </div>



                    </div>
                </div>

                <div className="w-full h-[500px]  flex justify-center items-center">
                    <div className="w-[80%] h-[60%] bg-customviolet relative">
                        <div className="absolute bg-slate-100  w-20 h-14 -top-5 -left-8 -rotate-45"></div>
                        <div className="absolute bg-slate-100  w-20 h-14 -bottom-5 -right-8 -rotate-45"></div>
                        <div className="absolute  left-[5%]  h-full w-[50%] flex flex-col justify-center">
                            <span className="font-bold text-4xl text-white">Start Posting jobs</span>
                            <span className="font-bold text-4xl text-white">today</span>
                            <span className="text-white">start posting jobs for free</span>
                            <button className='bg-white md:w-[40%] h-10  rounded-lg ease-linear transition-all duration-200  text-customviolet'>signup for free</button>
                        </div>
                        <span className="absolute font-finger text-4xl  lg:text-9xl text-white top-[35%] right-[10%]">5000+ Jobs </span>
                    </div>
                </div>
                <span className="w-ful h-10 font-bold text-4xl flex justify-center"> Enhace Your Career Path</span>
                <div className="w-full h-auto  flex pt-20">
                    <div className="flex flex-wrap gap-10 lg:gap-24 justify-content-center pl-[10%]" >
                        <div className="md:h-60 md:w-64 h-[160px] w-[170px] rounded-xl border border-gray-400 bg-black flex flex-col pt-2 md:gap-6 items-center  transition duration-300 ease-in-out hover:bg-customviolet group">
                            <div className="w-[95%] h-[70%]  rounded-xl flex justify-center items-center transition duration-300 ease-in-out bg-customviolet  group-hover:bg-black group-hover:text-black">
                                <HiOutlineRectangleGroup className="text-6xl text-white" />
                            </div>
                            <div className="w-full h-[30%] pl-2">
                                <span className="text-white">Popular Job Effective CV For Growth</span>
                            </div>
                        </div>
                        <div className="md:h-60 md:w-64 h-[160px] w-[170px] rounded-xl border border-gray-400 bg-black flex flex-col pt-2 md:gap-6 items-center  transition duration-300 ease-in-out hover:bg-customviolet group">
                            <div className="w-[95%] h-[70%]  rounded-xl flex justify-center items-center transition duration-300 ease-in-out bg-customviolet  group-hover:bg-black group-hover:text-black">
                                <BiLogoMicrosoftTeams className="text-6xl text-white" />
                            </div>
                            <div className="w-full h-[30%] pl-2">
                                <span className="text-white">Boost Team Productivity Tips</span>
                            </div>
                        </div>
                        <div className="md:h-60 md:w-64 h-[160px] w-[170px] rounded-xl border border-gray-400 bg-black flex flex-col pt-2 md:gap-6 items-center  transition duration-300 ease-in-out hover:bg-customviolet group">
                            <div className="w-[95%] h-[70%]  rounded-xl flex justify-center items-center transition duration-300 ease-in-out bg-customviolet  group-hover:bg-black group-hover:text-black">
                                <LiaIndustrySolid className="text-6xl text-white" />
                            </div>
                            <div className="w-full h-[30%] pl-2">
                                <span className="text-white">Tech Industry Job Hunt Tips</span>
                            </div>
                        </div>
                        <div className="md:h-60 md:w-64 h-[160px] w-[170px] rounded-xl border border-gray-400 bg-black flex flex-col pt-2 md:gap-6 items-center  transition duration-300 ease-in-out hover:bg-customviolet group">
                            <div className="w-[95%] h-[70%]  rounded-xl flex justify-center items-center transition duration-300 ease-in-out bg-customviolet  group-hover:bg-black group-hover:text-black">
                                <HiOutlineLightBulb className="text-6xl text-white" />
                            </div>
                            <div className="w-full h-[30%] pl-2">
                                <span className="text-white">Popular Job Interview Questions</span>
                            </div>
                        </div>


                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}
import { CompanyHeader } from "@/components/company/header"
import { FaArrowLeft, FaInstagram } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { CiLinkedin, CiTwitter } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { SiWebmoney } from "react-icons/si";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


export const ApplicantDetails = () => {
    const [page, setPage] = useState("")

    const handlePage = (page: string) => {
        setPage(page)
    }

    return (
        <>
            <div className="w-full flex-col bg-white">
                <div className=" w-full flex">

                    <div className="flex flex-col w-full gap-4">
                        <CompanyHeader />
                        <div className="w-full flex justify-between">
                            <div className="flex lg:flex-col p-1">
                                <span className="font-bold flex gap-4 justify-center items-center"><FaArrowLeft className="cursor-pointer" />Applicant Details</span>

                            </div>


                        </div>
                        <div className="w-full   flex">
                            <div className="w-[40%] h-full  flex justify-center pt-4 pb-4 ">
                                <div className="w-[95%] h-full  flex flex-col border rounded border-gray-300">
                                    <div className="w-full   flex mt-1">
                                        <div className="w-[40%] h-full flex justify-center items-center ">
                                            <img src="" className="w-28 h-28 rounded-full bg-black" alt="" />
                                        </div>
                                        <div className="w-[60%] h-full  flex flex-col justify-center">
                                            <span className="text-xl font-bold">SHIHAD</span>
                                        </div>
                                    </div>
                                    <div className="w-full  p-2 flex flex-col gap-2 ">
                                        <div className="w-full  rounded bg-gray-100 flex flex-col">
                                            <div className="flex p-2 justify-between">
                                                <span>Applied Jobs</span>
                                                <span className="text-sm text-gray-400">2 days ago</span>
                                            </div>
                                            <div className="w-full flex flex-col p-2">
                                                <span className="text-md font-bold">Product Development</span>
                                                <span className="text-sm text-gray-400">Marketing . Full-Time</span>
                                            </div>
                                        </div>
                                        <div className="w-full   flex flex-col gap-1">
                                            <div className="flex justify-between p-2">
                                                <span className="text-sm">Stage</span>
                                                <span className="text-sm text-customviolet">interview</span>
                                            </div>
                                            <div className="w-full flex gap-0.5 p-2">
                                                <div className="w-1/4 h-3 bg-customviolet"></div>
                                                <div className="w-1/4 h-3 bg-customviolet"></div>
                                                <div className="w-1/4 h-3 bg-customviolet"></div>
                                                <div className="w-1/4 h-3 bg-customviolet"></div>
                                            </div>
                                        </div>
                                        <div className="w-full   gap-1 flex justify-center items-center">
                                            <button className="p-4 hover:bg-customviolet hover:text-white border border-customviolet rounded font-bold text-customviolet "> Schedule Interview</button>
                                            <button className="p-4 hover:bg-customviolet hover:text-white border border-customviolet rounded flex justify-center items-center text-customviolet"><AiOutlineMessage className="text-2xl" /></button>
                                        </div>
                                        <div className="w-full  flex">

                                            <div className="w-full   flex flex-col gap-4 p-4 ">
                                                <span className="text-md font-bold">Contact</span>
                                                <div className="w-full h-8 flex flex-col ">
                                                    <span className="flex gap-2 justify-start items-center text-gray-500"><MdEmail />Email</span>
                                                    <span className="text-sm text-customviolet">sdfasdf</span>
                                                </div>
                                                <div className="w-full h-8 flex flex-col">
                                                    <span className="flex gap-2 justify-start items-center text-gray-500"><FaInstagram />Instagram</span>
                                                    <span className="text-sm text-customviolet">sdfsdf</span>
                                                </div>
                                                <div className="w-full h-8 flex flex-col">
                                                    <span className="flex gap-2 justify-start items-center text-gray-500"><CiLinkedin />Linkedin</span>
                                                    <span className="text-sm text-customviolet">sdfsdf</span>
                                                </div>
                                                <div className="w-full h-8 flex flex-col">
                                                    <span className="flex gap-2 justify-start items-center text-gray-500"><CiTwitter />Twitter</span>
                                                    <span className="text-sm text-customviolet">sdfsdf</span>
                                                </div>
                                                <div className="w-full h-8 flex flex-col">
                                                    <span className="flex gap-2 justify-start items-center text-gray-500"><SiWebmoney />Portfolio</span>
                                                    <span className="text-sm text-customviolet">sdfsdf</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-[60%]   flex justify-center  p-4">
                                <div className="w-[98%]  border border-gray-300 rounded flex flex-col gap-2">
                                    <div className="w-full h-16  flex gap-4 p-2 items-center border-b border-gray-300">
                                        <span onClick={() => handlePage("")} className={` cursor-pointer ${page == "" && 'border-b-4 border-customviolet'}  text-sm font-bold`}>Applicant Profile</span>
                                        <span onClick={() => handlePage("resume")} className={` cursor-pointer ${page == "resume" && 'border-b-4 border-customviolet'} text-sm font-bold`}>Resume</span>
                                        <span onClick={() => handlePage("questions")} className={` cursor-pointer ${page == "questions" && 'border-b-4 border-customviolet'} text-sm font-bold`}>Questions</span>
                                        <span onClick={() => handlePage("hiring")} className={` cursor-pointer ${page == "hiring" && 'border-b-4 border-customviolet'} text-sm font-bold`}>Hiring Progress</span>
                                        <span onClick={() => handlePage("interview")} className={` cursor-pointer ${page == "interview" && 'border-b-4 border-customviolet'} text-sm font-bold`}>Interview Schedule</span>
                                    </div>

                                    {page == "" && (


                                        <div className="w-full  bg-white flex flex-col gap-2">
                                            <div className="w-full  flex">
                                                <div className="w-1/3 h-full  flex flex-col p-2 gap-1">
                                                    <span className="text-md font-bold mb-4">Personal Info</span>
                                                    <span className="text-sm ">Full Name</span>
                                                    <span className="text-sm font-bold">SHIHAD</span>
                                                    <span className="text-sm mt-2">Date of Birth</span>
                                                    <span className="text-sm font-bold">March 23,1996</span>
                                                    <span className="text-sm mt-2">Address</span>
                                                    <span className="w-[95%] text-sm font-bold">$%!& Washingtom ave,
                                                        manchestre city</span>

                                                </div>
                                                <div className="w-1/3 h-full flex flex-col p-2 gap-1">
                                                    <span className="text-sm mt-12">Gender</span>
                                                    <span className="text-sm font-bold">Male</span>
                                                    <span className="text-sm mt-2">Date of Birth</span>
                                                    <span className="text-sm font-bold">March 23,1996</span>
                                                    <span className="text-sm mt-2">Language</span>
                                                    <span className="text-sm font-bold">English,French,Bahasa</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="w-full h-64  flex flex-col p-2 gap-1">
                                                <span className="text-md font-bold mb-4">Professional Info</span>
                                                <span className="text-sm text-gray-400">About Me</span>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae justo id arcu suscipit consequat. Nullam volutpat tincidunt arcu, in vehicula justo ullamcorper ut. Morbi eget sapien sit amet nisi scelerisque consectetur. Duis eget turpis vehicula, pretium nulla a, malesuada dolor. Integer suscipit leo vitae orci fermentum, id interdum lorem sollicitudin. Praesent eu metus tincidunt, dictum enim sed, luctus lectus. Ut vitae turpis sit amet risus vestibulum sagittis. Nam efficitur justo non est aliquam, at vestibulum est pharetra. Donec non nisi nec elit lacinia bibendum. Curabitur ut justo vitae mi tristique tincidunt.</p>
                                            </div>
                                            <div className="w-full   flex p-2 ">
                                                <div className="w-1/2   flex flex-col p-2 gap-1">
                                                    <span className="text-sm ">Current Job</span>
                                                    <span className="text-sm font-bold">Project Designer</span>
                                                    <span className="text-sm mt-4">Highest Qualification Held</span>
                                                    <span className="text-sm font-bold">Bachelor in Engineering</span>
                                                </div>
                                                <div className="w-1/2   flex flex-col p-2 gap-1">
                                                    <span className="text-sm ">Experience in Years</span>
                                                    <span className="text-sm font-bold">4 years</span>
                                                    <span className="text-sm mt-4">Skill Set</span>
                                                    <div className="text-sm font-bold flex flex-wrap gap-1">
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                        <span className="p-1 rounded border border-customviolet text-customviolet">Javascript</span>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    )}
                                    {page == "resume" && (
                                        <div className="w-full h-full  p-4">
                                            <iframe src="www.google.com" className="w-full h-full"></iframe>
                                        </div>
                                    )}

                                    {page == "questions" && (
                                        <div className="w-full flex flex-col p-2 gap-2">
                                            <span className="font-bold">1. why should we hire you</span>
                                            <span><span className="font-bold">a.</span> You should hire me because I bring a unique combination of skills, experience, and a strong work ethic that align perfectly with the requirements of this role. My background in [relevant field] has equipped me with a deep understanding of [specific skills or knowledge], which I have successfully applied in previous positions to achieve [specific achievements or results </span>
                                            <span className="font-bold">1. why should we hire you</span>
                                            <span><span className="font-bold">a.</span> You should hire me because I bring a unique combination of skills, experience, and a strong work ethic that align perfectly with the requirements of this role. My background in [relevant field] has equipped me with a deep understanding of [specific skills or knowledge], which I have successfully applied in previous positions to achieve [specific achievements or results </span>
                                            <span className="font-bold">1. why should we hire you</span>
                                            <span><span className="font-bold">a.</span> You should hire me because I bring a unique combination of skills, experience, and a strong work ethic that align perfectly with the requirements of this role. My background in [relevant field] has equipped me with a deep understanding of [specific skills or knowledge], which I have successfully applied in previous positions to achieve [specific achievements or results </span>
                                            <span className="font-bold">1. why should we hire you</span>
                                            <span><span className="font-bold">a.</span> You should hire me because I bring a unique combination of skills, experience, and a strong work ethic that align perfectly with the requirements of this role. My background in [relevant field] has equipped me with a deep understanding of [specific skills or knowledge], which I have successfully applied in previous positions to achieve [specific achievements or results </span>
                                            <span className="font-bold">1. why should we hire you</span>
                                            <span><span className="font-bold">a.</span> You should hire me because I bring a unique combination of skills, experience, and a strong work ethic that align perfectly with the requirements of this role. My background in [relevant field] has equipped me with a deep understanding of [specific skills or knowledge], which I have successfully applied in previous positions to achieve [specific achievements or results </span>
                                        </div>
                                    )}


                                    {page == "hiring" && (
                                        <div className="w-full flex flex-col">
                                            <div className="w-full p-4 flex flex-col gap-1">
                                                <span className="font-bold text-sm mb-4">Stage Info</span>

                                                <span className="text-sm text-gray-400">Interview Date</span>
                                                <span className="text-sm">10-13 july 2021</span>
                                                <span className="text-sm text-gray-400 mt-2">interviewer</span>
                                                <span className="text-sm">shihad,aflu,anirudh,afasl</span>
                                                <span className="text-sm text-gray-400 mt-2">status</span>
                                                <span className="text-sm p-1 border border-yellow-400 w-24 flex justify-center items-center rounded text-yellow-400 ">on-Progress</span>
                                            </div>
                                            <hr />
                                            <div className="w-full   flex flex-col p-2 gap-2">
                                                <div className="flex w-full justify-between p-1">
                                                    <span className="text-md font-bold">Notes</span>
                                                    <button className="p-2 border border-customviolet rounded text-sm text-customviolet hover:text-white hover:bg-customviolet flex gap-1 justify-center items-start"><FaPlus />Add Notes</button>
                                                </div>
                                                <div className="w-full p-1 flex flex-col border border-gray-400 rounded">
                                                    <span className="font-bold text-sm">Maria kelly</span>
                                                    <span className="text-sm text-gray-400">Please do an interview stage immediately The design division needs more new employee and specify the interviwer before one hour </span>
                                                </div>
                                                <div className="w-full p-1 flex flex-col border border-gray-400 rounded">
                                                    <span className="font-bold text-sm">Maria kelly</span>
                                                    <span className="text-sm text-gray-400">Please do an interview stage immediately The design division needs more new employee and specify the interviwer before one hour </span>
                                                </div>
                                                <div className="w-full p-1 flex flex-col border border-gray-400 rounded">
                                                    <span className="font-bold text-sm">Maria kelly</span>
                                                    <span className="text-sm text-gray-400">Please do an interview stage immediately The design division needs more new employee and specify the interviwer before one hour </span>
                                                </div>
                                                <div className="w-full p-1 flex flex-col border border-gray-400 rounded">
                                                    <span className="font-bold text-sm">Maria kelly</span>
                                                    <span className="text-sm text-gray-400">Please do an interview stage immediately The design division needs more new employee and specify the interviwer before one hour </span>
                                                </div>
                                                <div className="w-full p-1 flex flex-col border border-gray-400 rounded">
                                                    <span className="font-bold text-sm">Maria kelly</span>
                                                    <span className="text-sm text-gray-400">Please do an interview stage immediately The design division needs more new employee and specify the interviwer before one hour </span>
                                                </div>

                                            </div>
                                        </div>
                                    )}

                                    {page == "interview" && (
                                        <div className="w-full flex flex-col p-4">
                                            <div className="w-full p-1 flex justify-between">
                                                <span className="text-md font-bold">InterviewList</span>
                                                <button className="flex gap-1 justify-center items-center p-2 rounded border border-customviolet text-customviolet hover:text-white hover:bg-customviolet"><FaPlus />Add Schedule interview</button>
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <div className="w-full flex border border-gray-400 rounded p-4">
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                    <span className="text-sm font-bold">Kathryn Murphy</span>
                                                    <span className="text-sm text-gray-400">technical interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col justify-center">
                                                    <span className="text-sm font-bold">10:00 Am 11:30 Am</span>
                                                    <span className="text-sm text-gray-400">online interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                   <button className="p-1 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet flex gap-2 justify-center items-center"><FaEdit/>Add Feedback</button>
                                                  </div>
                                                </div>

                                                <div className="w-full flex border border-gray-400 rounded p-4">
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                    <span className="text-sm font-bold">Kathryn Murphy</span>
                                                    <span className="text-sm text-gray-400">technical interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col justify-center">
                                                    <span className="text-sm font-bold">10:00 Am 11:30 Am</span>
                                                    <span className="text-sm text-gray-400">online interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                   <button className="p-1 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet flex gap-2 justify-center items-center"><FaEdit/>Add Feedback</button>
                                                  </div>
                                                </div>

                                                <div className="w-full flex border border-gray-400 rounded p-4">
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                    <span className="text-sm font-bold">Kathryn Murphy</span>
                                                    <span className="text-sm text-gray-400">technical interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col justify-center">
                                                    <span className="text-sm font-bold">10:00 Am 11:30 Am</span>
                                                    <span className="text-sm text-gray-400">online interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                   <button className="p-1 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet flex gap-2 justify-center items-center"><FaEdit/>Add Feedback</button>
                                                  </div>
                                                </div>

                                                <div className="w-full flex border border-gray-400 rounded p-4">
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                    <span className="text-sm font-bold">Kathryn Murphy</span>
                                                    <span className="text-sm text-gray-400">technical interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col justify-center">
                                                    <span className="text-sm font-bold">10:00 Am 11:30 Am</span>
                                                    <span className="text-sm text-gray-400">online interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                   <button className="p-1 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet flex gap-2 justify-center items-center"><FaEdit/>Add Feedback</button>
                                                  </div>
                                                </div>
                                                <div className="w-full flex border border-gray-400 rounded p-4">
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                    <span className="text-sm font-bold">Kathryn Murphy</span>
                                                    <span className="text-sm text-gray-400">technical interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col justify-center">
                                                    <span className="text-sm font-bold">10:00 Am 11:30 Am</span>
                                                    <span className="text-sm text-gray-400">online interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                   <button className="p-1 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet flex gap-2 justify-center items-center"><FaEdit/>Add Feedback</button>
                                                  </div>
                                                </div>
                                                <div className="w-full flex border border-gray-400 rounded p-4">
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                    <span className="text-sm font-bold">Kathryn Murphy</span>
                                                    <span className="text-sm text-gray-400">technical interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col justify-center">
                                                    <span className="text-sm font-bold">10:00 Am 11:30 Am</span>
                                                    <span className="text-sm text-gray-400">online interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                   <button className="p-1 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet flex gap-2 justify-center items-center"><FaEdit/>Add Feedback</button>
                                                  </div>
                                                </div>
                                                <div className="w-full flex border border-gray-400 rounded p-4">
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                    <span className="text-sm font-bold">Kathryn Murphy</span>
                                                    <span className="text-sm text-gray-400">technical interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col justify-center">
                                                    <span className="text-sm font-bold">10:00 Am 11:30 Am</span>
                                                    <span className="text-sm text-gray-400">online interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                   <button className="p-1 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet flex gap-2 justify-center items-center"><FaEdit/>Add Feedback</button>
                                                  </div>
                                                </div>
                                                <div className="w-full flex border border-gray-400 rounded p-4">
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                    <span className="text-sm font-bold">Kathryn Murphy</span>
                                                    <span className="text-sm text-gray-400">technical interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col justify-center">
                                                    <span className="text-sm font-bold">10:00 Am 11:30 Am</span>
                                                    <span className="text-sm text-gray-400">online interview</span>
                                                  </div>
                                                  <div className="w-1/3 flex flex-col  justify-center">
                                                   <button className="p-1 border border-customviolet rounded text-customviolet hover:text-white hover:bg-customviolet flex gap-2 justify-center items-center"><FaEdit/>Add Feedback</button>
                                                  </div>
                                                </div>

                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
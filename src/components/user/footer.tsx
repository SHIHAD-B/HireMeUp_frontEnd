import logo from '../../assets/images/logo.png'
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";


export const Footer = () => {


    return (
        <>
            <div className="w-full h-[400px] flex-col  m-0">
                <div className="w-full  lg:h-[320px] lg:flex ">

                    <div className="h-full w-full lg:w-[30%] bg-gray-800 flex flex-col items-start pl-4 lg:pl-12  pt-12">
                        <img className='h-10 md:h-14 w-auto' src={logo} alt="" />
                        <div className='w-[80%] h-[40%] mt-5'>
                            <span className='text-white'>Great platform for the job seeker that passionate about startups.Find your dream job easier.</span>
                        </div>

                    </div>
                    <div className="h-full lg:w-[20%] w-full lg:items-start items-center flex flex-col pt-12 bg-gray-800 gap-2">
                        <span className='text-white font-bold text-xl'>About</span>
                        <span className='text-white'>Companies</span>
                        <span className='text-white'>Subscriptions</span>
                        <span className='text-white'>Terms</span>
                        <span className='text-white'>Advice</span>
                        <span className='text-white'>Privacy Policy</span>
                    </div>
                    <div className="h-full lg:w-[20%] w-full lg:items-start items-center  flex flex-col pt-12 bg-gray-800 gap-2">
                        <span className='text-white font-bold text-xl'>Resources</span>
                        <span className='text-white'>Help Docs</span>
                        <span className='text-white'>Guide</span>
                        <span className='text-white'>Updates</span>
                        <span className='text-white'>Contact Us</span>

                    </div>

                    <div className="h-full lg:w-[30%] w-full lg:items-start items-center flex flex-col pt-12 bg-gray-800 gap-2">
                        <span className='text-white font-bold text-xl'>Get job notifications</span>
                        <span className='text-white'>The latest job news,articles sent to your inbox weekly</span>
                        <div className='w-full  h-24 flex items-center gap-2 justify-center'>
                            <input value={"your email....."} className="flex  bg-gray-200 w-[250px] h-10 rounded-l shadow-xl border border-gray-100 " />
                            <button className='bg-customviolet w-36 h-10 text-white rounded-lg ease-linear transition-all duration-200 hover:rounded-3xl'>Connect</button>
                        </div>

                    </div>
                </div>
                <div className='h-[80px]  w-full bg-gray-800 border-t-2 border-gray-500   flex justify-around items-center'>
                    <div className='w-[50%] h-full  flex items-center pl-14'>
                        <span className='text-white'>2024@HireMeUp All rights reserved.</span>
                    </div>
                    <div className='w-[50%] h-full flex justify-center lg:justify-end pr-14 gap-2 items-center'>
                        <FaFacebook className='text-2xl cursor-pointer text-white' />
                        <AiFillInstagram className='text-2xl cursor-pointer text-white' />
                        <FaLinkedin className='text-2xl cursor-pointer text-white' />
                        <FaSquareTwitter className='text-2xl cursor-pointer text-white' />
                    </div>
                </div>
            </div>

        </>
    )
}
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import { HiMenuAlt1 } from "react-icons/hi";
import { ModeToggle } from '../common/mode-toggle';
import { RxCross1 } from 'react-icons/rx';
import { useState } from 'react';



export const Unauth_header = () => {

    const navigate = useNavigate()
    const [ham, setHam] = useState(false)
    const hamburger = () => {
        setHam(!ham)
    }
    return (
        <>
            {ham && (
                <>
                    <div className='w-48  bg-white flex-col absolute top-1 right-2 rounded z-10 flex gap-2'>
                        <span className='w-full flex justify-end pr-2'><RxCross1 onClick={hamburger} className='text-xl font-bold cursor-pointer' /></span>
                        <span onClick={() => navigate('/signin')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>LogIn</span>
                        <span onClick={() => navigate('/signup')} className='w-full h-10 border border-gray-200 text-customviolet flex justify-start items-center pl-4 hover:bg-customviolet hover:text-white'>SignUp</span>
                    </div>

                </>
            )}
            <div className="w-full h-14 flex items-center pl-5 pr-5  sm:pl-14 sm:pr-14 gap-20 justify-between mb-9 lg:mb-0">
                <div className='h-full gap-3 w-[40%] md:w-[35%] flex items-center  justify-between'>
                    <img onClick={() => navigate('/')} className=' h-[70%] sm:h-[90%] w-auto cursor-pointer' src={logo} alt="" />
                    <span onClick={() => navigate('/joblist')} className='hidden sm:block hover:text-customviolet cursor-pointer'>Find Jobs</span>
                    <span onClick={() => navigate('/companylist')} className='hidden sm:block hover:text-customviolet cursor-pointer'>Browse Companies</span>

                </div>
                <div className='h-full w-[40%]  flex justify-end items-center'>
                    <div className='hidden h-[80%] w-24  lg:flex justify-center items-center'>
                        <span onClick={() => navigate('/signin')} className='font-bold cursor-pointer duration-500 hover:translate-y-2 text-customviolet'>Login</span>
                    </div>
                    <div className='hidden h-[80%] w-24 broder border-grey border-l-2 lg:flex justify-center items-center'>
                        <button onClick={() => navigate('/signup')} className='bg-customviolet w-[90%] h-10 text-white rounded-lg ease-linear transition-all duration-200 hover:rounded-3xl'>Signup</button>
                    </div>

                    {/* <ThemeButton/> */}
                    <ModeToggle />
                    <HiMenuAlt1 onClick={hamburger} className='text-5xl md:hidden' />
                </div>
            </div>
        </>
    )
}
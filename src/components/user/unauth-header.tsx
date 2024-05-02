import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
// import { ThemeButton } from '../buttons/themeButton'
import { HiMenuAlt1 } from "react-icons/hi";




export const Unauth_header = () => {

    const navigate=useNavigate()
    return (
        <>
            <div className="w-full h-14 flex items-center pl-5 pr-5  sm:pl-14 sm:pr-14 gap-20 justify-between ">
                <div className='h-full gap-3 w-[40%] md:w-[30%] flex items-center  justify-between'>
                    <img className=' h-[70%] sm:h-[90%] w-auto' src={logo} alt="" />
                    <span className='hidden sm:block hover:text-customviolet cursor-pointer'>Find Jobs</span>
                    <span className='hidden sm:block hover:text-customviolet cursor-pointer'>Browse Companies</span>

                </div>
                <div className='h-full w-[40%]  flex justify-end items-center'>
                    <div className='h-[80%] w-24  flex justify-center items-center'>
                        <span onClick={()=>navigate('/signin')} className='font-bold cursor-pointer duration-500 hover:translate-y-2 text-customviolet'>Login</span>
                    </div>
                    <div className='h-[80%] w-24 broder border-grey border-l-2 flex justify-center items-center'>
                        <button onClick={()=>navigate('/signup')} className='bg-customviolet w-[90%] h-10 text-white rounded-lg ease-linear transition-all duration-200 hover:rounded-3xl'>signup</button>
                    </div>

                    {/* <ThemeButton/> */}
                    <HiMenuAlt1 className='text-5xl md:hidden' />
                </div>
            </div>
        </>
    )
}
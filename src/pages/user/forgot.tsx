


import forgot from '../../assets/images/forgot.png'
import logo from '../../assets/images/logo.png'
import { TextField } from '@mui/material';
import { Footer } from '../../components/user/footer';
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import { emailValidation } from '../../utils/validations/emailValidation';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsersData } from '../../redux/reducer/tempUserSlice';

export const Forgot = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [errorRes, setErrorRes] = useState('')

    const handleSubmit = async () => {
        try {
            setErrorRes('')
            await emailValidation.validate({ email }, { abortEarly: false });
            console.log("Validation successful");
            await Axios.post('http://localhost:3000/auth/forgot', { email }).then((res: any) => {
                console.log(res)
                if (res.status == 200) {
                    dispatch(setUsersData({ email: email }))
                    navigate('/forgototp')
                }
            }).catch((error: any) => {
                console.log(error)
            })
        } catch (error: any) {
            console.error("Validation failed:", error.message);
            setErrorRes(error.message)
        }
    };


    const handleChange = (event: any) => {
        setEmail(event.target.value)
    }

    return (
        <>
            <div className="w-screen h-screen bg-slate-100 flex items-center ">
                <div className="w-full lg:w-[40%] h-full flex flex-col pl-14  lg:pl-24 pt-4 gap-14 ">
                    <img src={logo} alt="" className="h-auto lg:w-44 w-32 mb-20" />
                    <div className='w-full h-[80%] flex flex-col gap-4'>
                        <span className='flex gap-2 items-center text-gray-400'><IoIosArrowBack />Back to Login</span>
                        <span className='text-2xl font-bold'>Forgot Your Password?</span>
                        <span className=' text-gray-500'>Don't worry,happens to all of us.Enter Your email below <br /> to recover your password</span>
                        <div className='w-full h-20   flex-col '>
                            <TextField
                                value={email}
                                onChange={handleChange}
                                className='w-[80%]'
                                id="outlined-multiline-flexible"
                                error={Boolean(errorRes)}
                                helperText={errorRes}
                                label="Email"
                                multiline
                                maxRows={4}
                            />
                        </div>

                        <button onClick={handleSubmit} className='bg-customviolet w-[80%] h-10 text-white rounded-lg ease-linear transition-all duration-200 hover:rounded-3xl'>continue</button>
                    </div>
                </div>
                <div className="w-[60%]  h-full flex-col pl-24 pt-4 hidden lg:block ">
                    <img src={forgot} alt="" className='w-[80%]' />
                </div>


            </div>
            <Footer />
        </>
    )
}
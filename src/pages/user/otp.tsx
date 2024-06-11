


import otpimg from '../../assets/images/otp.webp'
import logo from '../../assets/images/logo.png'
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { Footer } from '../../components/user/footer';
import { IoIosArrowBack } from "react-icons/io";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import { userSignup } from '../../redux/actions/userAction';
import { Loader } from '../../components/common/loader';
import { setUserData } from '../../redux/reducer/userSlicer';



export const Otp = () => {
    const dispatch = useDispatch<AppDispatch>()
    let { loading, user } = useSelector((state: RootState) => state.tempUser)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [time, setTime] = useState(60);
    const [formattedTime, setFormattedTime] = useState('01:00');
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('')

    const handleChange = (event: any) => {
        const { value } = event.target;
        const filteredValue = value.replace(/\D/g, '');
        setOtp(filteredValue);
    };

    useEffect(() => {

        if (!user?.email) {
            navigate('/signin');
        }
    }, []);

    useEffect(() => {

        console.log(user, "userdataaaaaaaa")
        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime >= 0) {
                    const minutes = Math.floor(prevTime / 60);
                    const seconds = prevTime % 60;
                    const formattedTimeString = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                    setFormattedTime(formattedTimeString);
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    return 0;
                }
            });
        }, 1000);


        return () => clearInterval(timer);
    }, []);

    const resendHandler = async () => {
        if (user) {
            dispatch(userSignup(user)).then((res: any) => {
                console.log(res, "response from dispatch user signup")
                setTime(60)
                setFormattedTime('01:00')

            }).then((error: any) => {
                console.log(error, "error response from dispatch user signup")

            })
        }
    }

    const verifyHandler = async () => {
        if (!otp) {
            setOtpError('enter otp')
        } else {
          const  updateUser:any = {
                ...user,
                otp: otp
            }
            await dispatch(userSignup(updateUser)).then((res) => {
               dispatch(setUserData(res.payload))
                navigate('/joblist')
            }).catch((error: any) => {
                console.log(error, "error response from dispatch user signup")

            })
        }

    }

    return (
        <>
            {loading && <Loader />}
            <div className="w-screen h-screen bg-slate-100 flex items-center">
                <div className="w-full lg:w-[40%] h-full flex-col pl-24 pt-4 ">
                    <img src={logo} alt="" className="h-auto lg:w-44 w-32 mb-20" />
                    <div className='w-full h-[80%] flex flex-col gap-4'>
                        <span onClick={() => navigate('/signin')} className='flex gap-2 items-center text-gray-400 cursor-pointer'><IoIosArrowBack />Back to Login</span>
                        <span className='text-2xl font-bold'>Verify Code</span>
                        <span className=' text-gray-500'>An authentication code has been sent to your email</span>
                        <div className='w-full h-20   flex-col  '>
                            <FormControl sx={{ m: 0, width: '80%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password" sx={{ color: otpError ? '#e53e3e' : undefined }}>Enter code</InputLabel>
                                <OutlinedInput
                                    onChange={handleChange}
                                    value={otp}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    inputProps={{ inputMode: 'numeric', pattern: "[0-9]*", maxLength: 4 }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Enter code"
                                    error={!!otpError}
                                />
                                <FormHelperText style={{ color: '#e53e3e' }} id="filled-weight-helper-text">{otpError}</FormHelperText>
                            </FormControl>

                        </div>
                        <span className='font-bold text-customviolet'>{formattedTime} s</span>
                        <span>Didn't receive a code? <span onClick={resendHandler} className='font-bold text-customviolet cursor-pointer'>Resend</span></span>
                        <button onClick={verifyHandler} className='bg-customviolet w-[80%] h-10 text-white rounded-lg ease-linear transition-all duration-200 hover:rounded-3xl'>verify</button>
                    </div>
                </div>
                <div className="w-[60%]  h-full flex-col pl-24 pt-4 hidden lg:block ">
                    <img src={otpimg} alt="" className='w-[70%]' />
                </div>


            </div>
            {!loading && <Footer />}

        </>
    )

}
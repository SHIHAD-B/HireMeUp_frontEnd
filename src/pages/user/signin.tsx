import logo from '../../assets/images/logo.png'
import signin from '../../assets/images/imgsignin.webp'
import { useState } from 'react';
import { ImStatsBars } from "react-icons/im";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { Footer } from '../../components/user/footer';
import { useNavigate } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import { signinValidation } from '../../utils/validations/signinValidation';
import { useDispatch, useSelector } from 'react-redux';
import { userSignin } from '../../redux/actions/userAction';
import { AppDispatch, RootState } from '../../redux/store';
import { Loader } from '../../components/common/loader';
import { GoogleLogin } from '@react-oauth/google'
import { userSignupWtihGoogle } from '../../redux/actions/userAction';
import { useToast } from '@/components/ui/use-toast';
import { companySignin } from '@/redux/actions/companyAction';



export const SignIn = () => {
    const { toast } = useToast()
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.user)
    const coloading=useSelector((state:RootState)=>state.company.loading)
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [seeker, setSeeker] = useState(true);

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const [compdata, setcompData] = useState({
        email: "",
        password: ""
    });

    const [comperrors, setcompErrors] = useState({
        email: "",
        password: ""
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleCompChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setcompData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            setErrors({
                email: "",
                password: ""
            });
            await signinValidation.validate(data, { abortEarly: false });
            console.log("Validation successful");
            dispatch(userSignin(data)).then((res: any) => {
                if (res?.error?.message == "Rejected") {
                    if (res.payload == "user blocked or deleted by admin") {
                        toast({
                            description: res.payload,
                            className: "bg-red-600 text-white"

                        })
                    } else {

                        setErrors(prev => ({
                            ...prev,
                            password: res.payload
                        }));
                    }

                } else {
                    navigate('/home')
                }
            }).catch((error: any) => {
                console.log(error, "error from dispatch")
            })
        } catch (error: any) {
            console.error("Validation failed:", error);
            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string; message: string; }) => {
                errors[err.path] = err.message;
            });
            setErrors(prev => ({
                ...prev,
                ...errors
            }));
            console.log(error)
        }
    };

    const handleCompSubmit = async () => {
        try {
            setcompErrors({
                email: "",
                password: ""
            });
            await signinValidation.validate(compdata, { abortEarly: false });
            console.log("Validation successful");
            dispatch(companySignin(compdata)).then((res: any) => {
                if (res?.error?.message == "Rejected") {
                    if (res.payload == "user blocked or deleted by admin") {
                        toast({
                            description: res.payload,
                            className: "bg-red-600 text-white"

                        })
                    } else {

                        setcompErrors(prev => ({
                            ...prev,
                            password: res.payload
                        }));
                    }

                } else {
                navigate('/company');
                }
            }).catch((error: any) => {
                console.log(error, "error from dispatch")
            })
        } catch (error: any) {
            console.error("Validation failed:", error);
            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string; message: string; }) => {
                errors[err.path] = err.message;
            });
            setcompErrors(prev => ({
                ...prev,
                ...errors
            }));
            console.log(error)
        }
    };

    const googleSignIn = async (response: string | any, status: boolean) => {
        console.log(response, status, "res from google")
        await dispatch(userSignupWtihGoogle(response)).then((res: any) => {
            console.log(res, "res from goodle")
            if (res.meta.requestStatus == "fulfilled") {
                navigate('/')
            } else {
                toast({
                    description: res.payload,
                    className: "bg-red-600 text-white"

                })
            }
        })
    }

    return (
        <>
            {loading||coloading && <Loader />}
            <div className="w-screen h-screen bg-slate-100 flex items-center">
                <div className="w-[50%] h-full flex-col pl-24 pt-4 hidden lg:block">
                    <img src={logo} alt="" className="h-auto lg:w-44 w-32 mb-8" />
                    <div className="w-full h-28 mb-8">
                        <div className="h-full w-36 border border-black flex flex-col pl-2 pt-2">
                            <ImStatsBars className="text-customviolet text-5xl" />
                            <span className="font-bold text-xl">100K+</span>
                            <span>People got hired</span>
                        </div>
                    </div>
                    <img src={signin} alt="" className="h-auto lg:w-[65%] w-32" />
                </div>

                {seeker ? (
                    <div className='  w-full lg:w-[50%] h-full  flex flex-col pl-14 pt-4 gap-8 justify-center items-start'>
                        <div className='w-[80%] h-[95%] bg-gray-200 flex flex-col gap-10 items-center'>
                            <div className='w-full h-12  flex justify-center gap-2 items-center'>
                                <span className='p-2   border border-gray-400 flex items-center justify-center cursor-pointer text-customviolet  font-bold rounded-xl ' onClick={() => setSeeker(true)}>Job Seeker</span>
                                <span className='flex items-center justify-center cursor-pointer  font-bold text-customviolet' onClick={() => setSeeker(false)}>company</span>
                            </div>
                            <span className='font-bold w-full flex justify-center text-2xl'>Welcome Back,Dude</span>


                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <TextField
                                    name='email'
                                    value={data.email}
                                    onChange={handleChanges}
                                    className='w-[80%]'
                                    id="outlined-multiline-flexible"
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}
                                    label="Email"
                                    multiline
                                    maxRows={4}
                                />
                            </div>
                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password" sx={{ color: errors.password ? '#e53e3e' : undefined }}>Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        name='password'
                                        value={data.password}
                                        error={Boolean(errors.password)}
                                        onChange={handleChanges}
                                        type={showPassword ? 'text' : 'password'}
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
                                        label="Password"

                                    />
                                    <FormHelperText style={{ color: '#e53e3e' }} id="filled-weight-helper-text">{errors.password}</FormHelperText>

                                </FormControl>
                            </div>

                            <button onClick={handleSubmit} className='bg-customviolet w-[80%] h-10 text-white rounded-lg ease-linear transition-all duration-200 hover:rounded-3xl'>Signin</button>
                            <div className='w-[80%] h-40  flex flex-col gap-4'>
                                <div className='w-[100%] flex justify-center'>
                                    <GoogleLogin
                                        text='signin_with'
                                        shape='rectangular'
                                        onSuccess={credentialResponse => {
                                            console.log(credentialResponse);
                                            googleSignIn(credentialResponse, true);
                                        }}
                                        onError={() => {
                                            console.log('Signup Failed ')
                                        }}
                                    />
                                </div>
                                <span className='flex gap-1 text-sm'>Don't have an account?<span onClick={() => navigate('/signup')} className='text-customviolet font-bold cursor-pointer '>signup</span></span>
                                <span className='flex gap-1 text-sm'>Forgot password? Don't worry <span onClick={() => navigate('/forgot')} className='text-customviolet font-bold cursor-pointer'>click here</span></span>
                                <span className='text-gray-400 text-sm'>By Clicking 'signin',you acknowledge that you read and accept the <span className='text-customviolet font-bold'>Terms of Service</span> and <span className='text-customviolet font-bold'>Privacy Policy</span> </span>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className=' w-full lg:w-[50%] h-full  flex flex-col pl-14 pt-4 gap-8 justify-center items-start'>
                        <div className='w-[80%] h-[95%] bg-gray-200 flex flex-col gap-10 items-center'>
                            <div className='w-full h-12  flex justify-center gap-2 items-center'>
                                <span className=' flex items-center justify-center cursor-pointer text-customviolet  font-bold ' onClick={() => setSeeker(true)}>Job Seeker</span>
                                <span className='p-2   border border-gray-400  flex items-center justify-center cursor-pointer  font-bold text-customviolet rounded-xl' onClick={() => setSeeker(false)}>company</span>
                            </div>
                            <span className='font-bold w-full flex justify-center text-2xl'>Welcome Back,Dude</span>



                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <TextField
                                    name='email'
                                    value={compdata.email}
                                    onChange={handleCompChanges}
                                    className='w-[80%]'
                                    id="outlined-multiline-flexible"
                                    error={Boolean(comperrors.email)}
                                    helperText={comperrors.email}
                                    label="Email"
                                    multiline
                                    maxRows={4}
                                />
                            </div>
                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password" sx={{ color: comperrors.password ? '#e53e3e' : undefined }}>Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        name='password'
                                        value={compdata.password}
                                        error={Boolean(comperrors.password)}
                                        onChange={handleCompChanges}
                                        type={showPassword ? 'text' : 'password'}
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
                                        label="Password"

                                    />
                                    <FormHelperText style={{ color: '#e53e3e' }} id="filled-weight-helper-text">{comperrors.password}</FormHelperText>

                                </FormControl>
                            </div>



                            <button onClick={handleCompSubmit} className='bg-customviolet w-[80%] h-10 text-white rounded-lg ease-linear transition-all duration-200 hover:rounded-3xl'>Signin</button>
                            <div className='w-[100%] flex justify-center'>
                                <GoogleLogin
                                    text='signin_with'
                                    shape='rectangular'
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                        googleSignIn(credentialResponse, true);
                                    }}
                                    onError={() => {
                                        console.log('Signup Failed ')
                                    }}
                                />
                            </div>
                            <div className='w-[80%] h-40  flex flex-col gap-4'>
                                <span className='flex gap-1 text-sm'>Don't have an account?<span onClick={() => navigate('/signup')} className='text-customviolet font-bold cursor-pointer'>signup</span></span>
                                <span className='flex gap-1 text-sm'>Forgot password? Don't worry <span onClick={()=>navigate('/company/forgot')} className='text-customviolet font-bold cursor-pointer'>click here</span></span>
                                <span className='text-gray-400 text-sm'>By Clicking 'signin',you acknowledge that you read and accept the <span className='text-customviolet font-bold'>Terms of Service</span> and <span className='text-customviolet font-bold'>Privacy Policy</span> </span>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            {!loading&&!coloading && <Footer />}

        </>
    )
}
import logo from '../../assets/images/logo.png'
import signup from '../../assets/images/imgsignup.png'
import React, { useState } from 'react';
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
import { signupValidation } from '../../utils/validations/signupValidation';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsersData, clearUserData } from '../../redux/reducer/tempUserSlice';
import { setCompanyDatas, clearCompanyDatas } from '../../redux/reducer/tempCompanySlice';
import { config } from '../../config/configuration';
import { companyValidation } from '../../utils/validations/companySignupValidation';

export const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false)

    const [seeker, setSeeker] = useState(true)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setConfirmPassword((show) => !show);


    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [document, setDocument] = useState<File | null>(null);

    const [companyData, setCompanyData] = useState({
        companyname: "",
        email: "",
        password: "",
        document: "dfgdfg",
        confirmPassword: ""
    })


    const [errorRes, setErrorRes] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errorCompRes, setErrorCompRes] = useState({
        companyname: "",
        email: "",
        password: "",
        document: "",
        confirmPassword: ""
    })

    const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const handleCompanyChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCompanyData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        try {
            setErrorRes({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
            await signupValidation.validate(userData, { abortEarly: false });
            console.log("Validation successful");
            // const IP=import.meta.env.IP
            Axios.post('http://localhost:3000/auth/signup', userData, config).then((res: AxiosResponse<any, any>) => {
                if (res.status == 200) {
                    dispatch(setUsersData(userData))
                    navigate('/otp');

                }
            }).catch((error: any) => {
                console.log(error.response.data.message, "error fasdfsdfasfd")
                setErrorRes(prev => ({
                    ...prev,
                    email: error.response.data.message
                }));
                dispatch(clearUserData())
            })

        } catch (error: any) {

            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string; }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            console.error("Validation failed:", errors);

            const errorss = {
                username: errors.username,
                email: errors.email,
                password: errors.password,
                confirmPassword: errors.confirmPassword
            }
            setErrorRes(prev => ({
                ...prev,
                ...errorss
            }));
        }
        console.log(errorRes, "error res")
    }

    const handleCompanySubmit = async () => {
        try {
            setErrorCompRes({
                companyname: "",
                email: "",
                password: "",
                document: "",
                confirmPassword: ""
            })

            if (document) {
                setErrorCompRes(prev => ({
                    ...prev,
                    document: "document is needed"
                }))
            }

            if (companyData.document)
                await companyValidation.validate(companyData, { abortEarly: false });
            console.log("Validation successful");
            if (errorCompRes.document == "") {

                Axios.post('http://localhost:3000/auth/companysignup', companyData, config).then((res: AxiosResponse<any, any>) => {
                    if (res.status == 200) {
                        dispatch(setCompanyDatas(companyData))
                        navigate('/companyotp');

                    }
                }).catch((error: any) => {
                    console.log(error.response.data.message, "error fasdfsdfasfd")
                    setErrorRes(prev => ({
                        ...prev,
                        email: error.response.data.message
                    }));
                    dispatch(clearCompanyDatas())
                })
            }





        } catch (error: any) {

            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string; }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            console.error("Validation failed:", errors);

            const errorsss = {
                companyname: errors.companyname,
                email: errors.email,
                password: errors.password,
                confirmPassword: errors.confirmPassword
            }
            setErrorCompRes(prev => ({
                ...prev,
                ...errorsss
            }));
        }
        console.log(errorRes, "error res")
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setDocument(file);
        }
    };




    return (
        <>
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
                    <img src={signup} alt="" className="h-auto lg:w-[80%] w-32" />
                </div>

                {seeker ? (
                    <div className=' w-full lg:w-[50%] h-full  flex flex-col pl-14 pt-4 gap-8 justify-center items-start'>
                        <div className='w-[80%] h-[95%] bg-gray-200 flex flex-col gap-6 items-center'>
                            <div className='w-full h-12  flex justify-center gap-2 items-center mt-2'>
                                <span className=' p-2   border border-gray-400 flex items-center justify-center cursor-pointer text-customviolet  font-bold rounded-xl  ' onClick={() => setSeeker(true)}>Job Seeker</span>
                                <span className='  flex items-center justify-center cursor-pointer text-customviolet   ' onClick={() => setSeeker(false)}>company</span>
                            </div>
                            <span className='font-bold w-full flex justify-center text-2xl'>Get more opportunities</span>


                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <TextField
                                    name='username'
                                    value={userData.username}
                                    onChange={handleChanges}
                                    className='w-[80%]'
                                    id="outlined-multiline-flexible"
                                    error={Boolean(errorRes.username)}
                                    helperText={errorRes.username}
                                    label="Full Name"
                                    multiline
                                    maxRows={4}
                                />
                            </div>
                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <TextField
                                    name='email'
                                    value={userData.email}
                                    onChange={handleChanges}
                                    className='w-[80%]'
                                    id="outlined-multiline-flexible"
                                    error={Boolean(errorRes.email)}
                                    helperText={errorRes.email}
                                    label="Email"
                                    multiline
                                    maxRows={4}
                                />
                            </div>
                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password" sx={{ color: errorRes.password ? '#e53e3e' : undefined }}>Password</InputLabel>
                                    <OutlinedInput
                                        name='password'
                                        value={userData.password}
                                        onChange={handleChanges}

                                        id="outlined-adornment-password"
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
                                        error={!!errorRes.password}
                                    />
                                    <FormHelperText style={{ color: '#e53e3e' }} id="filled-weight-helper-text">{errorRes.password}</FormHelperText>

                                </FormControl>
                            </div>
                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password" sx={{ color: errorRes.confirmPassword ? '#e53e3e' : undefined }}>Confirm password</InputLabel>
                                    <OutlinedInput
                                        name='confirmPassword'
                                        value={userData.confirmPassword}
                                        onChange={handleChanges}
                                        id="outlined-adornment-password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="confrmPassword"
                                        error={!!errorRes.confirmPassword} // Pass whether there's an error for the password field
                                    />
                                    <FormHelperText style={{ color: '#e53e3e' }} id="filled-weight-helper-text">{errorRes.confirmPassword}</FormHelperText>

                                </FormControl>
                            </div>
                            <button onClick={handleSubmit} className='bg-customviolet w-[80%] h-10 text-white rounded-lg ease-linear transition-all duration-200 hover:rounded-3xl'>Continue</button>
                            <div className='w-[80%] h-40  flex flex-col gap-4'>
                                <span onClick={()=>navigate('/signin')} className='flex gap-1 text-sm cursor-pointer'>Already have an account?<span className='text-customviolet font-bold'>Login</span></span>
                                <span className='text-gray-400 text-sm'>By Clicking 'Continue',you acknowledge that you read and accept the <span className='text-customviolet font-bold'>Terms of Service</span> and <span className='text-customviolet font-bold'>Privacy Policy</span> </span>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className=' w-full lg:w-[50%] h-full  flex flex-col pl-14 pt-4 gap-8 justify-center items-start'>
                        <div className='w-[80%] h-[95%] bg-gray-200 flex flex-col gap-6 items-center'>
                            <div className='w-full h-12  flex justify-center gap-2 items-center mt-2'>
                                <span className='h-[70%] w-24  flex items-center justify-center cursor-pointer text-customviolet  font-bold ' onClick={() => setSeeker(true)}>Job Seeker</span>
                                <span className=' p-2   border border-gray-400 flex items-center justify-center cursor-pointer text-customviolet  font-bold rounded-xl  ' onClick={() => setSeeker(false)}>company</span>
                            </div>
                            <span className='font-bold w-full flex justify-center text-2xl'></span>


                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <TextField
                                    name="companyname"
                                    onChange={handleCompanyChanges}
                                    value={companyData.companyname}
                                    error={Boolean(errorCompRes.companyname)}
                                    className='w-[80%]'
                                    id="outlined-multiline-flexible"
                                    helperText=""
                                    label="Company Name"
                                    multiline
                                    maxRows={4}
                                />
                            </div>
                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <TextField
                                    name="email"
                                    onChange={handleCompanyChanges}
                                    error={Boolean(errorCompRes.email)}
                                    value={companyData.email}
                                    className='w-[80%]'
                                    id="outlined-multiline-flexible"
                                    helperText=""
                                    label="Email"
                                    multiline
                                    maxRows={4}
                                />
                            </div>
                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password" sx={{ color: errorCompRes.password ? '#e53e3e' : undefined }}>Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        onChange={handleCompanyChanges}
                                        error={Boolean(errorCompRes.password)}
                                        value={companyData.password}
                                        name="password"
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
                                </FormControl>
                            </div>
                            <div className='w-full h-20   flex-col flex items-center justify-center'>
                                <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password" sx={{ color: errorCompRes.confirmPassword ? '#e53e3e' : undefined }}>Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        value={companyData.confirmPassword}
                                        error={Boolean(errorCompRes.confirmPassword)}
                                        name="confirmPassword"
                                        onChange={handleCompanyChanges}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="ConfrmPassword"
                                    />
                                </FormControl>
                            </div>

                            <div className='relative w-[80%] h-10 overflow-hidden'>

                                <label htmlFor="fileInput" className={`absolute inset-0 border ${errorCompRes.document ? "border-red-400" : document ? "border-green-400" : "border-gray-400"} w-full h-full text-gray rounded-lg cursor-pointer flex items-center justify-center`}>
                                    submit document
                                    <input
                                        id="fileInput"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>

                            </div>



                            <button onClick={handleCompanySubmit} className='bg-customviolet w-[80%] h-10 text-white rounded-lg ease-linear transition-all duration-200 hover:rounded-3xl'>Continue</button>
                            <div className='w-[80%] h-40  flex flex-col gap-4'>
                                <span onClick={()=>navigate('/signin')} className='flex gap-1 text-sm cursor-pointer'>Already have an account?<span className='text-customviolet font-bold'>Login</span></span>
                                <span className='text-gray-400 text-sm'>By Clicking 'Continue',you acknowledge that you read and accept the <span className='text-customviolet font-bold'>Terms of Service</span> and <span className='text-customviolet font-bold'>Privacy Policy</span> </span>
                            </div>

                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}
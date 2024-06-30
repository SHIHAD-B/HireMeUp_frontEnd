
import logo from '../../assets/images/logo.png'
import reset from '../../assets/images/reset.png'
import { Footer } from '../../components/user/footer';
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { passwordValidation } from '../../utils/validations/passwordValidation';
import Axios, { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { FormHelperText } from '@mui/material';

export const ResetPassword = () => {
    const navigate = useNavigate()
    let {user} = useSelector((state: RootState) => state.tempUser)
    const [showPassword, setShowPassword] = useState(false);
    const [reShowPassword, setReShowPassword] = useState(false);
    const [data, setData] = useState({
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState({
        password: '',
        confirmPassword: ''
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickReShowPassword = () => setReShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const handleSubmit = async () => {
        try {
            setError({
                password: "",
                confirmPassword: ""
            })
            await passwordValidation.validate(data, { abortEarly: false });
            console.log("Validation successful");

            const passData = {
                ...user,
                password: data.password
            }
              
             console.log(passData,"passdata")
            Axios.patch('http://localhost:3000/user/resetPassword', passData,{withCredentials:true}).then((res: AxiosResponse<any, any>) => {
                console.log(res)
                if (res.status == 200) {

                    navigate('/signin');

                }
            }).catch((error: any) => {
                console.log(error, "error fasdfsdfasfd")
                setError(prev => ({
                    ...prev,
                    password: error.response.data.message
                }));

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
                password: errors.password,
                confirmPassword: errors.confirmPassword
            }
            setError(prev => ({
                ...prev,
                ...errorss
            }));
        }
        console.log(error, "error res")
    }


    return (
        <>
            <div className="w-screen h-screen bg-slate-100 flex items-center ">
                <div className="w-full lg:w-[40%] h-full flex flex-col pl-14  lg:pl-24 pt-4 gap-14 ">
                    <img onClick={()=>navigate('/')} src={logo} alt="" className="h-auto lg:w-44 w-32 mb-20 cursor-pointer" />
                    <div className='w-full h-[80%] flex flex-col gap-4'>
                        <span className='flex gap-2 items-center text-gray-400'><IoIosArrowBack />Back to Login</span>
                        <span className='text-2xl font-bold'>Forgot Your Password?</span>
                        <span className=' text-gray-500'>Your previous password had been reseted.Please set a  <br /> new password for your account.</span>
                        <div className='w-full h-20   flex-col '>
                            <FormControl sx={{ m: 0, width: '80%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password" sx={{ color: error.password ? '#e53e3e' : undefined }}>Create Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name='password'
                                    value={data.password}
                                    onChange={handleChange}
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
                                    label="Create Password"
                                    error={!!error.password}
                                />
                                <FormHelperText style={{ color: '#e53e3e' }} id="filled-weight-helper-text">{error.password}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className='w-full h-20   flex-col '>
                            <FormControl sx={{ m: 0, width: '80%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password" sx={{ color: error.confirmPassword ? '#e53e3e' : undefined }}>Re-enter Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    type={reShowPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickReShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {reShowPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Re-enter Password"
                                    error={!!error.confirmPassword}
                                />
                                <FormHelperText style={{ color: '#e53e3e' }} id="filled-weight-helper-text">{error.confirmPassword}</FormHelperText>
                            </FormControl>
                        </div>

                        <button onClick={handleSubmit} className='bg-customviolet w-[80%] h-10 text-white rounded-lg ease-linear transition-all duration-200 hover:rounded-3xl'>continue</button>
                    </div>
                </div>
                <div className="w-[60%]  h-full flex-col pl-24 pt-4 hidden lg:block ">
                    <img src={reset} alt="" className='w-[80%]' />
                </div>


            </div>
            <Footer />
        </>
    )
}
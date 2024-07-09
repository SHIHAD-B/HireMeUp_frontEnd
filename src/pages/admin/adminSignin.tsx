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
import { AppDispatch, RootState } from '../../redux/store';
import { Loader } from '../../components/common/loader';
import { useToast } from '@/components/ui/use-toast';
import { adminSignin } from '@/redux/actions/adminAction';



export const AdminSignIn = () => {
    const { toast } = useToast()
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.user)
    const coloading = useSelector((state: RootState) => state.company.loading)
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
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


    const handleSubmit = async () => {
        try {
            setErrors({
                email: "",
                password: ""
            });
            await signinValidation.validate(data, { abortEarly: false });
            console.log("Validation successful..");
            dispatch(adminSignin(data)).then((res: any) => {
                if (res?.error?.message == "Rejected") {
                    if (res.payload == "user blocked or deleted by admin") {
                        toast({
                            description: res.payload,
                            className: "bg-red-600 text-white"

                        })
                    } else {
                        toast({
                            description: res.payload,
                            className: "bg-red-600 text-white"
                        });

                        setErrors(prev => ({
                            ...prev,
                            password: res.payload
                        }));
                    }

                } else {
                    navigate('/admin/dashboard')
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





    return (
        <>
            {loading || coloading && <Loader />}
            <div className="w-screen h-screen bg-slate-100 flex items-center">
                <div className="w-[50%] h-full flex-col pl-24 pt-4 hidden lg:block">
                    <img onClick={() => navigate('/')} src={logo} alt="" className="h-auto lg:w-44 w-32 mb-8 cursor-pointer" />
                    <div className="w-full h-28 mb-8">
                        <div className="h-full w-36 border border-black flex flex-col pl-2 pt-2">
                            <ImStatsBars className="text-customviolet text-5xl" />
                            <span className="font-bold text-xl">100K+</span>
                            <span>People got hired</span>
                        </div>
                    </div>
                    <img src={signin} alt="" className="h-auto lg:w-[65%] w-32" />
                </div>


                <div className='  w-full lg:w-[50%] h-full  flex flex-col pl-14 pt-4 gap-8 justify-center items-start'>
                    <div className='w-[80%] h-[95%] bg-gray-200 flex flex-col gap-10 items-center'>

                        <span className='font-bold w-full flex justify-center text-2xl mt-4'>Admin Login</span>


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

                    </div>
                </div>


            </div>
            {!loading && !coloading && <Footer />}

        </>
    )
}
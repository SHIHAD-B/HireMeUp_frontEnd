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
import { RootState } from '../../redux/store';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { companySignup } from '@/redux/actions/companyAction';
import { AppDispatch } from '../../redux/store';
import { Loader } from '../../components/common/loader';

export const CompanyOtp = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/home')
    };

    const dispatch = useDispatch<AppDispatch>()
    const { companydata, loading } = useSelector((state: RootState) => state.tempCompany)
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
        if (!companydata) {
            navigate('/signup');
        }
    }, []);

    useEffect(() => {

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
        await dispatch(companySignup(companydata)).then((res: any) => {
            setTime(60)
            setFormattedTime('01:00')
        }).catch((error: any) => {
            console.log(error.response.data.message, "error fasdfsdfasfd")
        })
    }

    const verifyHandler = async () => {
        if (!otp) {
            setOtpError('enter otp')
        } else {
            const data = {
                ...companydata,
                otp: otp
            }
            await dispatch(companySignup(data)).then(() => {
                handleClickOpen()
            })
        }
    }

    return (
        <>
            {loading && <Loader />}
            <div className="w-screen h-screen bg-slate-100 flex items-center">
                <div className="w-full lg:w-[40%] h-full flex-col pl-24 pt-4 ">


                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"sucess"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Request is submitted for review by the admin, it will be reviewed, and once reviewed, acknowledgment will be sent via email.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={handleClose} autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

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
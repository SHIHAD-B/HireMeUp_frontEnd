import pro from '../../assets/images/pro.jpg';
import { GiSevenPointedStar } from "react-icons/gi";
import { IoImageOutline } from "react-icons/io5";
import Cropper from "react-easy-crop";
import { Point, Area } from 'react-easy-crop';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getCroppedImage } from '@/utils/crop/getCroppedimg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { uploadFile } from '@/utils/uploadfile/uploadDocument';
import { Loader } from '../common/loader';
import { useToast } from '@/components/ui/use-toast';
import { profileOneValidation } from '@/utils/validations/user/profileOneValidation';
import { editUsers } from '@/redux/actions/userAction';
import { IUsers } from '@/interfaces/IUser';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ProfileOne = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { toast } = useToast()
    const { user, loading } = useSelector((state: RootState) => state.user)
    const [load, setLoad] = useState(false)
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string>("");
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [userData, setUserData] = useState<IUsers | null>(user)
    const [error, setError] = useState({
        profile: "",
        username: "",
        phone: "",
        dob: "",
        gender: ""
    })

    useEffect(() => {
        setUserData(user)
        if (!user?.profile) {
            setUserData((prev: any) => ({
                ...prev,
                profile: pro
            }))
        }
    }, [])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    setImage(event.target.result as string);
                    handleOpen(); 
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onSaveCroppedImage = async () => {
        if (!image || !croppedAreaPixels) return;
        try {
            const croppedImg: any = await getCroppedImage(image, croppedAreaPixels);

            setUserData((prev: any) => ({
                ...prev,
                profile: croppedImg
            }))
            handleClose();
            setLoad(true)
            const imglink = await uploadFile(croppedImg)
            setUserData((prev: any) => ({
                ...prev,
                profile: imglink
            }))
            setLoad(false)
            if (!imglink) {
                toast({
                    description: "Failed to upload profile at the moment!..",
                    className: "bg-red-600 text-white"

                })
                setUserData((prev: any) => ({
                    ...prev,
                    profile: pro
                }))
            }
            console.log(imglink)
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target;
        setUserData((prev: any) => ({
            ...prev,
            [name]: String(value)
        }));
    };



    const handleSubmit = async () => {
        try {
            setError({
                username: "",
                phone: "",
                profile: "",
                dob: "",
                gender: ""
            });


            await profileOneValidation.validate(userData, { abortEarly: false });

            if (userData && JSON.stringify(userData) === JSON.stringify(user)) {
                toast({
                    description: "Profile is already up to date!",
                    className: "bg-blue-500 text-white rounded"
                });
                return; 
            } else {


                console.log(userData, "Validation successful");
                if (userData?.password) {
                    delete userData.password
                }
                dispatch(editUsers(userData as IUsers)).then((res: any) => {
                    console.log(res,"response from edit user")
                    toast({
                        description: "Profile updated successfully....",
                        className: "bg-green-600 text-white rounded"

                    })
                }).catch((error:any)=>{
                    toast({
                        description: "please try again...",
                        className: "bg-red-600 text-white rounded"

                    })
                });

            }
        } catch (error: any) {
            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            console.error("Validation failed:", errors);

            const errorsss = {
                username: errors.username,
                phone: errors.phone,
                profile: errors.profile,
                dob: errors.dob,
                gender: errors.gender
            }

            setError((prev: any) => ({
                ...prev,
                ...errorsss
            }));
        }
    };

    return (
        <div className="w-full flex-col">
            {loading || load && <Loader />}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, position: 'relative' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className='w-[500px] h-[500px]'>
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                    </Typography>
                    <div className='w-full h-8 flex gap-4 justify-end absolute bottom-4 right-4 '>
                        <button onClick={handleClose} className='p-2 rounded border hover:bg-black hover:text-red-500 bg-red-500 flex justify-center items-center'>cancel</button>
                        <button onClick={onSaveCroppedImage} className='p-2 border rounded bg-green-500 hover:bg-black hover:text-green-500 flex justify-center items-center'>save</button>
                    </div>
                </Box>
            </Modal>

            <div className="w-full h-14 pl-2 flex-col flex  border-b border-gray-200 justify-center ">
                <span className="font-bold">Basic Information</span>
                <span className="text-gray-400 text-sm">This is your personal information that you can update anytime.</span>
            </div>
            <div className="w-full h-[400px] border-b border-gray-200  lg:h-56 pl-2 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2  h-full flex justify-between items-center pt-2">
                    <div className="w-1/2 flex flex-col ">
                        <span className='font-bold'>Profile Photo</span>
                        <span className='text-sm text-gray-400'>This image will be shown publicly as your profile, it will help recruiters recognize you!</span>
                    </div>
                    <div className=" w-52 h-52 rounded-full flex flex-col items-center gap-2 justify-center">
                        <img src={userData?.profile} className='h-full w-full rounded-full border-gray-200 object-cover' alt="" />
                        <p className='text-xs text-red-500'>{error.profile}</p>
                    </div>
                </div>
                <div className='w-full lg:w-1/2 justify-center lg:justify-start h-full pl-4 flex items-center'>
                    <label onChange={handleOpen} htmlFor="fileInput" className='w-[60%] h-[80%] border-2 border-dashed rounded border-customviolet flex flex-col justify-center items-center cursor-pointer'>
                        <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleImageSelect} />
                        <IoImageOutline className='text-customviolet text-2xl' />
                        <span className='font-bold text-customviolet'>Click to replace</span>
                        <span className='text-sm text-gray-400'>SVG, PNG, JPG, or JPEG (max 400 x 400px)</span>
                    </label>
                </div>
            </div>
            <div className='w-full flex pt-4 flex-col lg:flex-row  border-b border-gray-200'>
                <div className='h-full w-full lg:w-1/4 pl-2'>
                    <span className='font-bold'>Personal Details</span>
                </div>
                <div className='w-full m-2 lg:w-2/5 flex flex-col gap-6'>
                    <div className='1/4 flex flex-col gap-2'>
                        <span className='flex '>Full Name<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                        <input name='username' onChange={(e) => handleChange(e)} type="text" value={userData?.username} className='w-full border rounded border-gray-400 h-10 bg-background' />
                        <p className='text-xs text-red-500'>{error.username}</p>
                    </div>
                    <div className='flex w-full gap-1'>
                        <div className='w-1/2 flex flex-col gap2'>
                            <span className='flex '>Phone Number<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="number" onChange={handleChange} name='phone' value={userData?.phone} className='w-full border rounded border-gray-400 h-10 bg-background' />
                            <p className='text-xs text-red-500'>{error.phone}</p>
                        </div>
                        <div className=' w-1/2 flex flex-col gap2'>
                            <span className='flex '>Email<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="text" name='email' readOnly value={userData?.email} className='w-full border rounded border-gray-400 h-10 bg-background' />

                        </div>
                    </div>
                    <div className='flex w-full gap-1'>
                        <div className='w-1/2 flex flex-col gap2'>
                            <span className='flex '>Date of Birth<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <input type="Date" name='dob' onChange={handleChange} value={userData?.dob ? userData.dob.toLocaleString().split('T')[0] : ''}
                                className='w-full border rounded border-gray-400 h-10 bg-background' />
                            <p className='text-xs text-red-500'>{error.dob}</p>
                        </div>
                        <div className=' w-1/2 flex flex-col gap2'>
                            <span className='flex '>Gender<GiSevenPointedStar className='text-[6px] mt-1 text-red-500' /></span>
                            <select onClick={(e) => handleChange(e)} name='gender' className='appearance-none w-full border rounded border-gray-400 h-10 px-4 bg-background'  defaultValue="">
                                <option value='' disabled hidden>{userData?.gender ? userData?.gender : "Select one"}</option>

                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>

                            </select>
                            <p className='text-xs text-red-500'>{error.gender}</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-end pr-6 mt-10 pb-2'>
                <button onClick={handleSubmit} className='p-2 border rounded text-white bg-customviolet hover:bg-white hover:text-customviolet'>Save Profile</button>
            </div>
        </div>
    );
};

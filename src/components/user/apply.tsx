import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '@/interfaces/config/constant';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { employeeList } from '@/redux/actions/companyAction';
import { FaFilePdf } from 'react-icons/fa6';
import { IJobData } from '@/interfaces/IUser';
import * as yup from 'yup'
import { uploadFile } from '@/utils/uploadfile/uploadDocument';
import { Loader } from '../common/loader';

export interface IApply {
    jobId: string,
    handleaddClose: () => void,
    setApp: Dispatch<SetStateAction<boolean>>;
}

export const Apply = (Adata: IApply) => {
    const { handleaddClose, jobId,setApp} = Adata
    const { user } = useSelector((state: RootState) => state.user)
    const { data } = useSelector((state: RootState) => state.job)
    const [jobData, setJobData] = useState<IJobData | null>(null)
    const { toast } = useToast()
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [selectedFile, setSelectedFile] = useState<any>({});
    const [pdfError, setPdfError] = useState("")
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        const job = data?.find((item) => item._id === jobId);
        setJobData(job as IJobData);


        if (job?.questions) {
            const initialFormData: { [key: string]: string } = {};
            job.questions.forEach((_, index) => {
                initialFormData[`question_${index}`] = '';
            });
            setFormData(initialFormData);
        }
    }, [data, jobId]);
    const handleFileChange = (event: any) => {
        setSelectedFile(event?.target?.files[0]);
    };

    const [formError, setFormError] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch<AppDispatch>()

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setFormData(prevPlans => ({
            ...prevPlans,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setLoading(true)
        const arrQuestion = [formData];
        try {

            setFormError({});
            setPdfError("")
            let valid = true
            if (!user?.cv && !selectedFile?.name) {
                setPdfError("please add cv..")
                valid = false
            }

            if (arrQuestion.length) {
                const validationSchema: { [key: string]: yup.StringSchema } = {};


                Object.keys(formData).forEach(key => {
                    validationSchema[key] = yup.string().required('This field is required');
                });

                const dynamicValidation = yup.object().shape(validationSchema);


                await dynamicValidation.validate(arrQuestion[0], { abortEarly: false });
            }

            console.log("Validation successful");

            if (valid) {
                let resume
                if (selectedFile.name) {
                    resume = await uploadFile(selectedFile, String(selectedFile.name))
                } else {
                    resume = user?.cv
                }

                const data = {
                    companyId:jobData?.companyId,
                    jobId: jobData?._id,
                    userId: user?._id,
                    resume: resume,
                    answers: arrQuestion

                }

                await axios.post(`${BASE_URL}job/user/addapplicant`, data, { withCredentials: true })
                    .then((res: any) => {
                        console.log(res, "res from the add employee");
                        handleaddClose();
                        toast({
                            description: "Applied successfully",
                            className: "bg-customviolet text-white"
                        });
                        setApp(true)
                        setLoading(false)
                        dispatch(employeeList());
                    }).catch((error: any) => {
                        setLoading(false)
                        toast({
                            description: "failed to apply!",
                            className: "bg-red-400 text-white"
                        });
                        if (error.response?.data?.message) {
                            setFormError(prev => ({
                                ...prev,
                                general: error?.response?.data?.message
                            }));
                        }
                        console.log(error, "error from the apply job");
                    });
            }


        } catch (error: any) {
            setLoading(false)
            console.error('Validation error:', error);
            if (error?.inner) {
                const errors: { [key: string]: string } = {};
                error?.inner?.forEach((err: { path: string | number; message: string; }) => {
                    if (err.path) {
                        errors[err.path] = err.message;
                    }
                });
                setFormError(errors);
            } else {
                setFormError({ general: error.message });
            }
        }
    };


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (

        <div>
            {loading&&<Loader/>}
            <Modal
                open={true}
                onClose={handleaddClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Apply for the job
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="max-w-md mx-auto">
                            {jobData?.questions.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <p>{item}</p>
                                    <TextField
                                        label="Answer"
                                        name={`question_${index}`}
                                        value={formData[`question_${index}`]}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        error={!!formError[`question_${index}`]}
                                        helperText={formError[`question_${index}`]}
                                    />
                                </div>
                            ))}

                            <div className="mb-4">
                                <div className="w-full h-36 border-customviolet">
                                    <div className="w-full justify-center h-full flex items-center">
                                        <label htmlFor="fileInput" className={`w-full h-full border-2 border-dashed rounded ${pdfError.length ? 'border-red-400' : 'border-customviolet'}  flex flex-col justify-center items-center cursor-pointer`}>
                                            <input
                                                type="file"
                                                id="fileInput"
                                                className="hidden"
                                                accept="application/pdf"
                                                onChange={(e) => handleFileChange(e)}
                                            />
                                            <FaFilePdf className={`${pdfError.length ? 'text-red-400' : 'text-customviolet'} text-2xl`} />
                                            <span className={`font-bold ${pdfError.length ? 'text-red-400' : 'text-customviolet'} `}>Click to add / replace Resume</span>
                                            <span className="text-sm text-gray-400">
                                                {selectedFile.name ? selectedFile.name : (user?.cv ? user?.cv?.split("/")?.pop()?.split(".")?.shift() : 'select a pdf')} (Max 5 mb)

                                            </span>
                                        </label>
                                    </div>
                                    <p className='text-sm mt-1 text-red-400'>{pdfError}</p>
                                </div>
                            </div>
                        </div>
                    </Typography>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        className='bg-customviolet'
                        sx={{ mr: 2, mt: 2 }}
                    >
                        Apply
                    </Button>
                    <Button
                        onClick={handleaddClose}
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 2 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </div>

    )
}
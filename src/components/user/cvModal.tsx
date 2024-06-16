import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '@/interfaces/config/constant';
import { useToast } from '@/components/ui/use-toast';
import { FaFilePdf } from 'react-icons/fa6';
import { uploadFile } from '@/utils/uploadfile/uploadDocument';
import { Loader } from '../common/loader';
import { IUsers } from '@/interfaces/IUser';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

interface ICv {
    id: string,
    close: () => void,
    users: any,
    setUser: Dispatch<SetStateAction<IUsers>>;
}


export const CvModal = (datas: ICv) => {
    const {  close, users, setUser } = datas
    const { user } = useSelector((state: RootState) => state.user)
    const { toast } = useToast()
    const [selectedFile, setSelectedFile] = useState<any>({});
    const [pdfError, setPdfError] = useState("")
    const [loading, setLoading] = useState(false)
    const [usersData, setUsersData] = useState<IUsers>(users)

    const handleFileChange = (event: any) => {
        setSelectedFile(event?.target?.files[0]);
    };
    useEffect(() => {
        setUsersData(users)
    }, [])

    const handleSubmit = async () => {
        setLoading(true);

        try {
            setPdfError("");
            let valid = true;

            if (!user?.cv && !selectedFile?.name) {
                setPdfError("please add cv..");
                valid = false;
            }

            if (valid) {
                let resume;
                if (selectedFile?.name) {
                    resume = await uploadFile(selectedFile, String(selectedFile.name));
                } else {
                    resume = user?.cv;
                }

                const data = {
                    id: user?._id,
                    resume: resume,
                };

                await axios.patch(`${BASE_URL}user/addresume`, data, { withCredentials: true })
                    .then(() => {
                        close();
                        toast({
                            description: "resume added successfully",
                            className: "bg-customviolet text-white"
                        });
                        setLoading(false);
                        setUser((prev) => ({
                            ...prev,
                            cv: resume
                        }))
                    })
                    .catch((error: any) => {
                        console.log(error)
                        setLoading(false);
                        toast({
                            description: "Failed to add resume!",
                            className: "bg-red-400 text-white"
                        });
                    });
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error('Validation error:', error);

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
            {loading && <Loader />}
            <Modal
                open={true}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                       Add Your Resume
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="max-w-md mx-auto">

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
                                                {selectedFile.name ? selectedFile.name : (usersData?.cv ? usersData?.cv?.split("/")?.pop()?.split(".")?.shift() : 'select a pdf')} (Max 5 mb)

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
                        Continue
                    </Button>
                    <Button
                        onClick={close}
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
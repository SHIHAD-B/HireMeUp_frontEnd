import { IUsers } from "@/interfaces/IUser";
import { BASE_URL } from "@/interfaces/config/constant";
import { AppDispatch, RootState } from "@/redux/store";
import { Modal, Typography, Box } from "@mui/material"
import { Button as MButton } from '@mui/material';
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { fetchUser } from "@/redux/actions/userAction";

interface IAbout {
    id: string,
    close: () => void
   
}

export const AboutModal = (data: IAbout) => {
    const dispatch=useDispatch<AppDispatch>()
    const { toast } = useToast()
    const { close, id } = data
    const { user } = useSelector((state: RootState) => state.user)
    const [cuser, setCuser] = useState<IUsers>(user as IUsers)
    const [error, setError] = useState("")
    const continues = async () => {
        setError("")
        if (cuser?.about?.trim() == "") {
            setError("field is required")
            return
        } else if (String(cuser?.about)?.length < 20) {
            setError("please add more sentences")
            return
        }
        const datas = {
            id: id,
            data: cuser.about,
            field: "about"
        }
        await axios.patch(`${BASE_URL}user/updateprofile`, datas, { withCredentials: true }).then((res: any) => {
            console.log(res, "res from the profile")
            toast({
                description: "about updated.",
                className: "bg-customviolet text-white"
            });
            close()
            dispatch(fetchUser());
        }).catch((error: any) => {
            console.log(error)
            toast({
                description: "failed to update about",
                className: "bg-red-400 text-white"
            });
            close()

        })
    }

    const handleChange = (e: any) => {
        setCuser((prev) => ({
            ...prev,
            about: e.target.value
        }))
    }

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
        <>
            <div>
                <Modal
                    open={true}

                    aria-labelledby="modal-modal-titles"
                    aria-describedby="modal-modal-descriptions"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-titles" variant="h6" component="h2">
                            ADD/EDIT About
                        </Typography>
                        <Typography id="modal-modal-descriptions" sx={{ mt: 2 }}>
                            <div className="max-w-md mx-auto">
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">About</label>
                                    <textarea onChange={(e) => handleChange(e)} id="description" value={cuser?.about ? String(cuser?.about) : ""} name="description" className="shadow min-h-56 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                                    <p className="text-red-500  text-xs">{error}</p>
                                </div>
                            </div>

                        </Typography>
                        <MButton onClick={continues} className="bg-customviolet" variant="contained" sx={{ mr: 2, mt: 2 }}>
                            Continue
                        </MButton>
                        <MButton onClick={close} variant="outlined" color="secondary" sx={{ mt: 2 }} >
                            Cancel
                        </MButton>
                    </Box>
                </Modal>
            </div>

        </>
    )
}
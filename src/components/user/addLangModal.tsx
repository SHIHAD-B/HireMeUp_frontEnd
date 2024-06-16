import { IUsers } from "@/interfaces/IUser";
import { BASE_URL } from "@/interfaces/config/constant";
import { Modal, Typography, Box, TextField } from "@mui/material"
import { Button as MButton } from '@mui/material';
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";



interface ILanguage {
    id: string,
    close: () => void,
    users:any,
    setUser: Dispatch<SetStateAction<IUsers>>;
}

export const AddLangModal = (data: ILanguage) => {

    const { toast } = useToast()
    const { close, setUser,users } = data
 const {user}=useSelector((state:RootState)=>state.user)
    const [LangData, setLangData] = useState("")
    const [error, setError] = useState("")


    const continues = async () => {

        setError("")

        try {

            if (LangData.trim() == "") {
                setError("feild is required")
            }else if(users.language.includes(LangData)){
                setError("already Exists")
            } else {
                const sendData={
                    id:user?._id,
                    language:LangData
                }

                await axios.patch(`${BASE_URL}user/addlanguage`, sendData, { withCredentials: true }).then(() => {
                    toast({
                        description: "Language added.",
                        className: "bg-customviolet text-white"
                    });

                    setUser((prev: any) => ({
                        ...prev,
                        language: [...prev.language, LangData]
                    }))

                    close()
                }).catch((error: any) => {
                    console.log(error)
                    toast({
                        description: "failed to add Language",
                        className: "bg-red-400 text-white"
                    });
                    close()

                })
            }

        } catch (error: any) {

        }
    }

    const handleChange = (e: any) => {
        const { value } = e.target
        setLangData(value)

        setError("")
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
                            Add Language
                        </Typography>

                        <TextField
                            label="language"
                            name="language"
                            value={LangData}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error)}
                            helperText={error}
                            sx={{ mt: 1 }}
                        />

                        <MButton onClick={continues} color="success" variant="contained" sx={{ mr: 2, mt: 2 }}>
                            Add
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
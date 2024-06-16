import { ISocialLink, IUsers } from "@/interfaces/IUser";
import { BASE_URL } from "@/interfaces/config/constant";
import { RootState } from "@/redux/store";
import { Modal, Typography, Box, TextField} from "@mui/material"
import { Button as MButton } from '@mui/material';
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { socialLinkValidation } from "@/utils/validations/user/socialLinkValidation";


interface ISocialLinks {
    id: string,
    close: () => void,
    users:any
    setUser: Dispatch<SetStateAction<IUsers>>;
}

export const SocialLinkModal = (data: ISocialLinks) => {

    const { toast } = useToast()
    const { close, setUser,users } = data
    const { user } = useSelector((state: RootState) => state.user)
    const [socialLink, setSocialLink] = useState<ISocialLink>(users?.contacts as ISocialLink)


    const [error, setError] = useState({
        instagram: "",
        linkedin: "",
        portfolio: "",
        twitter: "",
    })

 
    const continues = async () => {

        setError({
            instagram: "",
            linkedin: "",
            portfolio: "",
            twitter: "",
        })

        try {
            await socialLinkValidation.validate(socialLink, { abortEarly: false });

            const data = {
                id: user?._id,
                data: socialLink
            }

            await axios.patch(`${BASE_URL}user/editsociallink`, data, { withCredentials: true }).then((res: any) => {
                console.log(res, "res from the add experience")
                toast({
                    description: "social link added.",
                    className: "bg-customviolet text-white"
                });
              
                setUser((prev: any) => ({
                    ...prev,
                    contacts:socialLink
                }))

                close()
            }).catch((error: any) => {
                console.log(error)
                toast({
                    description: "failed to set social links",
                    className: "bg-red-400 text-white"
                });
                close()

            })
        } catch (error: any) {
            const errors: { [key: string]: string } = {};
            error.inner.forEach((err: { path: string | number; message: string }) => {
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });
            console.error("Validation failed:", errors);

            const errorsss = {
                instagram: errors.instagram,
                linkedin: errors.linkedin,
                portfolio: errors.portfolio,
                twitter: errors.twitter,
            }

            setError((prev: any) => ({
                ...prev,
                ...errorsss
            }));
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setSocialLink((prev) => ({
            ...prev,
            [name]: value
        }))

        setError((prev) => ({
            ...prev,
            [name]: ""
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
                            Social Links
                        </Typography>


                        <TextField
                            label="instagram"
                            name="instagram"
                            value={socialLink?.instagram?socialLink.instagram:""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error.instagram)}
                            helperText={error.instagram}
                            sx={{ mt: 1 }}
                        />
                        <TextField
                            label="linkedin"
                            name="linkedin"
                            value={socialLink?.linkedin?socialLink?.linkedin:""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error.linkedin)}
                            helperText={error.linkedin}
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <TextField
                            label="portfolio"
                            name="portfolio"
                            value={socialLink?.portfolio?socialLink?.portfolio:""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error.portfolio)}
                            helperText={error.portfolio}
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <TextField
                            label="twitter"
                            name="twitter"
                            value={socialLink?.twitter?socialLink?.twitter:""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error.linkedin)}
                            helperText={error.linkedin}
                            sx={{ mt: 1, mb: 2 }}
                        />
                      <MButton onClick={continues} color="success" variant="contained" sx={{ mr: 2, mt: 2 }}>
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
import { IUsers } from "@/interfaces/IUser";
import { BASE_URL } from "@/interfaces/config/constant";
import { RootState } from "@/redux/store";
import { Modal, Typography, Box, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Button as MButton } from '@mui/material';
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { addressValidation } from "@/utils/validations/user/addressValidation";



interface IAddress {
    id: string,
    close: () => void,
    users: any,
    setUser: Dispatch<SetStateAction<IUsers>>;
}

export const AddressModal = (data: IAddress) => {

    const { toast } = useToast()
    const { close, setUser, users } = data
    const { user } = useSelector((state: RootState) => state.user)
    const [userData, setUserData] = useState<IUsers>(users as IUsers)
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
                    headers: {
                        'X-CSCAPI-KEY': 'c2J0MHBQSlhRQjFJOWVCd3NlWVRLcTJjeTZMcFJ1cmFVcDd2SndlWg=='
                    }
                });
                setCountries(response.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchStates = async () => {
            if (userData?.address?.country && countries?.length > 0) {
                const country: any = countries.find((item: any) => item?.name === userData.address.country);
                if (country) {
                    const iso2 = country?.iso2;
                    try {
                        const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${iso2}/states`, {
                            headers: {
                                'X-CSCAPI-KEY': 'c2J0MHBQSlhRQjFJOWVCd3NlWVRLcTJjeTZMcFJ1cmFVcDd2SndlWg=='
                            }
                        });
                        console.log(response.data, "countries");
                        setStates(response.data);
                    } catch (error) {
                        console.error("Error fetching states:", error);
                    }
                }
            }
        };

        fetchStates();
    }, [userData?.address?.country, countries]);


    useEffect(() => {
        const fetchCities = async () => {
            const countryI: any = countries.find((item: any) => item.name === userData?.address?.country)
            const stateI: any = states.find((item: any) => item.name === userData?.address?.state)
            if (countryI && stateI) {
                const countryIso2 = countryI.iso2
                const stateIso2 = stateI.iso2
                try {
                    const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateIso2}/cities`, {
                        headers: {
                            'X-CSCAPI-KEY': 'c2J0MHBQSlhRQjFJOWVCd3NlWVRLcTJjeTZMcFJ1cmFVcDd2SndlWg=='
                        }
                    });
                    setCities(response.data);
                } catch (error) {
                    console.error("Error fetching cities:", error);
                }
            }
        };

        fetchCities();
    }, [userData?.address?.country, userData?.address?.state, countries, states]);

    const [error, setError] = useState({
        houseNumber: "",
        locality: "",
        city: "",
        state: "",
        pin: "",
        country: ""
    })


    const continues = async () => {

        setError({
            houseNumber:"",
            locality: "",
            city: "",
            state: "",
            pin: "",
            country: ""
        })

        try {
            await addressValidation.validate(userData.address, { abortEarly: false });

            const data = {
                id: user?._id,
                data: userData.address
            }

            await axios.patch(`${BASE_URL}user/addaddress`, data, { withCredentials: true }).then((res: any) => {
                console.log(res, "res from the add experience")
                toast({
                    description: "address added.",
                    className: "bg-customviolet text-white"
                });
              
                setUser((prev: any) => ({
                    ...prev,
                    address: userData.address
                }))

                close()
            }).catch((error: any) => {
                console.log(error)
                toast({
                    description: "failed to add address",
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
                houseNumber: errors.houseNumber,
                locality: errors.locality,
                city: errors.city,
                state: errors.state,
                pin: errors.pin,
                country: errors.country
            }

            setError((prev: any) => ({
                ...prev,
                ...errorsss
            }));
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        if (name === 'pin' && !/^\d{0,6}$/.test(value)) {
            setError((prev:any)=>({
                ...prev,
                 pin: 'Pin should be a 6-digit number'
                 }));
            return;
        } else {
            setError((prev:any)=>({
                ...prev,
                 pin: '' 
                }));
        }
        setUserData((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value }

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
                            Address
                        </Typography>

                        <TextField
                            label="houseNumber/houseName"
                            name="houseNumber"
                            value={userData?.address?.houseNumber}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error?.houseNumber)}
                            helperText={error?.houseNumber}
                            sx={{ mt: 1 }}
                        />
                        <TextField
                            label="locality"
                            name="locality"
                            value={userData?.address?.locality}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error?.locality)}
                            helperText={error?.locality}
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <TextField
                            label="pin"
                            name="pin"
                            value={userData?.address?.pin}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(error?.pin)}
                            helperText={error?.pin}
                            sx={{ mt: 1, mb: 2 }}
                            inputProps={{
                                inputMode: 'numeric', 
                                pattern: '[0-9]*', 
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" error={Boolean(error?.country)}>
                                Country
                            </InputLabel>
                            <Select
                                name="country"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="grade"
                                value={userData?.address?.country}
                                onChange={handleChange}
                                error={Boolean(error?.country)}
                                sx={{ mt: 1, mb: 1 }}
                            >
                                {countries?.map((item: any, index) => (

                                    <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
                                ))}





                            </Select>
                            {error?.country && <div className="text-sm ml-5 text-red-600">{error?.country}</div>}
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" error={Boolean(error?.state)}>
                                State
                            </InputLabel>
                            <Select
                                name="state"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="state"
                                value={userData.address?.state}
                                onChange={handleChange}
                                error={Boolean(error?.state)}
                                sx={{ mt: 1, mb: 1 }}
                            >
                                {states.map((item: any, index) => (

                                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                                ))}





                            </Select>
                            {error?.state && <div className="text-sm ml-5 text-red-600">{error?.state}</div>}
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" error={Boolean(error?.city)}>
                                City
                            </InputLabel>
                            <Select
                                name="city"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="city"
                                value={userData.address?.city}
                                onChange={handleChange}
                                error={Boolean(error?.city)}
                                sx={{ mt: 1, mb: 1 }}
                            >
                                {cities.map((item: any, index) => (

                                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                                ))}

                            </Select>
                            {error?.city && <div className="text-sm ml-5 text-red-600">{error?.city}</div>}
                        </FormControl>

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
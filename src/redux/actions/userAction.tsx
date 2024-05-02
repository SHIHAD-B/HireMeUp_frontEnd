import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserData } from "../../interfaces/IUser";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../config/constant";
import { ApiError, config, handleError } from "../../config/configuration";
import { reduxRequest } from "../../config/api";



export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    try {
        await axios.get(`${BASE_URL}user/fetchUser`, { withCredentials: true })
            .then((response) => {
                return response.data.user;
            })
            .catch((error: any) => {
                throw new Error(error)
            });
    } catch (error: any) {
        throw new Error(error)
    }
})




export const userSignin = createAsyncThunk("auth/signin", async (userdata: IUserData, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/signin",
        config,
        rejectWithValue,
        userdata
    )

})

export const userSignup = createAsyncThunk("auth/signup", async (userdata: IUserData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${BASE_URL}auth/signup`, userdata, config)
        return data.user

    } catch (error: any) {
        const axiosError = error as AxiosError<ApiError>;
        return handleError(axiosError, rejectWithValue);
    }
})


export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        const response = await axios.get(`${BASE_URL}auth/logout`, config)
        console.log(response,"response from logout")
        return response.data

    } catch (error: any) {
        throw new Error(error)
    }
})


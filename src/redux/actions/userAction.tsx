import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUsers } from "../../interfaces/IUser";
import { config } from "../../interfaces/config/configuration";
import { reduxRequest } from "../../interfaces/config/api";



export const fetchUser = createAsyncThunk("user/fetchUser", async (_,{rejectWithValue}) => {
    return reduxRequest(
        "get",
        "user/fetchUser",
        config,
        rejectWithValue,
    )
})

export const fetchSubscription = createAsyncThunk("subscription/user/fetchplans", async (_,{rejectWithValue}) => {
    return reduxRequest(
        "get",
        "subscription/user/fetchplans",
        config,
        rejectWithValue,
    )
})



export const userSignin = createAsyncThunk("auth/signin", async (userdata: IUsers, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/signin",
        config,
        rejectWithValue,
        userdata
    )

})

export const userSignup = createAsyncThunk("auth/signup", async (userdata: IUsers, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/signup",
        config,
        rejectWithValue,
        userdata
    )

})
export const userSignupWtihGoogle = createAsyncThunk("auth/signupwithgoogle", async (credentialId: string, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/signupwithgoogle",
        config,
        rejectWithValue,
        { id: credentialId }
    )

})

export const forgot = createAsyncThunk("auth/forgot", async (email: string, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/forgot",
        config,
        rejectWithValue,
        { email }
    )

})

export const UfetchCategory=createAsyncThunk('job/user/categorylist',async (_,{rejectWithValue})=>{
    return reduxRequest(
        "get",
        "job/user/categorylist",
        config,
        rejectWithValue,
    )
})




export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "auth/logout",
        config,
        rejectWithValue

    )

})


export const editUsers = createAsyncThunk("user/editUser", async (data:IUsers, { rejectWithValue }) => {
    return reduxRequest(
        "patch",
        "user/editUser",
        config,
        rejectWithValue,
        data
    )
})


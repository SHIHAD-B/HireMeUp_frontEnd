import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../interfaces/config/configuration";
import { reduxRequest } from "../../interfaces/config/api";
import { ICompanyData } from "@/interfaces/IUser";


export const adminSignin = createAsyncThunk("auth/adminsignin", async (Data: ICompanyData, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/adminsignin",
        config,
        rejectWithValue,
        Data
    )

})

export const fetchAdmin = createAsyncThunk("user/fetchadmin", async (_,{rejectWithValue}) => {
    return reduxRequest(
        "get",
        "user/fetchadmin",
        config,
        rejectWithValue,
    )
})

export const fetchSubscription = createAsyncThunk("subscription/fetchplans", async (_,{rejectWithValue}) => {
    return reduxRequest(
        "get",
        "subscription/fetchplans",
        config,
        rejectWithValue,
    )
})

export const fetchCategory=createAsyncThunk('job/categorylist',async (_,{rejectWithValue})=>{
    return reduxRequest(
        "get",
        "job/categorylist",
        config,
        rejectWithValue,
    )
})
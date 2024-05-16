import { createAsyncThunk } from "@reduxjs/toolkit";
import { config,configfile } from "../../interfaces/config/configuration";
import { reduxRequest } from "../../interfaces/config/api";
import { ICompanyData } from "@/interfaces/IUser";


export const fetchCompany = createAsyncThunk("company/fetchcompany", async (_,{rejectWithValue}) => {
    return reduxRequest(
        "get",
        "company/fetchcompany",
        config,
        rejectWithValue,
    )
})


export const allRequests = createAsyncThunk("company/fetchrequests", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "company/fetchrequests",
        config,
        rejectWithValue,
    )

})

export const companyList = createAsyncThunk("company/companylist", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "company/companylist",
        config,
        rejectWithValue,
    )

})

export const companySignin = createAsyncThunk("auth/companysignin", async (Data: ICompanyData, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/companysignin",
        config,
        rejectWithValue,
        Data
    )

})


export const companySignup = createAsyncThunk("auth/companysignup", async (data: ICompanyData | null, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/companysignup",
        configfile,
        rejectWithValue,
        data
    )

})

export const companyforgot = createAsyncThunk("auth/companyforgot", async (email: string, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/companyforgot",
        config,
        rejectWithValue,
        { email }
    )

})
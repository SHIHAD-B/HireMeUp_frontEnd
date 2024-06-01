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


export const allRequests = createAsyncThunk("company/admin/fetchrequests", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "company/admin/fetchrequests",
        config,
        rejectWithValue,
    )

})

export const companyList = createAsyncThunk("company/admin/companylist", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "company/admin/companylist",
        config,
        rejectWithValue,
    )

})
export const companyUserList = createAsyncThunk("company/user/companylist", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "company/user/companylist",
        config,
        rejectWithValue,
    )

})
export const employeeList = createAsyncThunk("company/company/listemployee", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "company/company/listemployee",
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

export const editCompany = createAsyncThunk("company/company/editcompany", async (data:ICompanyData, { rejectWithValue }) => {
    return reduxRequest(
        "patch",
        "company/company/editcompany",
        config,
        rejectWithValue,
        data
    )
})


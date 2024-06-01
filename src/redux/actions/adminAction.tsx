import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../interfaces/config/configuration";
import { reduxRequest } from "../../interfaces/config/api";
import { ICompanyData, IUsers } from "@/interfaces/IUser";


export const adminSignin = createAsyncThunk("auth/adminsignin", async (Data: ICompanyData, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/adminsignin",
        config,
        rejectWithValue,
        Data
    )

})

export const fetchAdmin = createAsyncThunk("user/admin/fetchadmin", async (_,{rejectWithValue}) => {
    return reduxRequest(
        "get",
        "user/admin/fetchadmin",
        config,
        rejectWithValue,
    )
})

export const fetchSubscription = createAsyncThunk("subscription/admin/fetchplans", async (_,{rejectWithValue}) => {
    return reduxRequest(
        "get",
        "subscription/admin/fetchplans",
        config,
        rejectWithValue,
    )
})

export const fetchCategory=createAsyncThunk('job/admin/categorylist',async (_,{rejectWithValue})=>{
    return reduxRequest(
        "get",
        "job/admin/categorylist",
        config,
        rejectWithValue,
    )
})

export const editUsers = createAsyncThunk("user/admin/editUser", async (data:IUsers, { rejectWithValue }) => {
    return reduxRequest(
        "patch",
        "user/admin/editUser",
        config,
        rejectWithValue,
        data
    )
})

export const listUsers = createAsyncThunk("user/admin/listusers", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "user/admin/listusers",
        config,
        rejectWithValue
    )
})

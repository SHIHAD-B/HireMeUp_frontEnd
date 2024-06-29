import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../interfaces/config/configuration";
import { reduxRequest } from "../../interfaces/config/api";
import { ICompanyData, IUsers } from "@/interfaces/IUser";


export const adminSignin = createAsyncThunk("auth/cus/adminsignin", async (Data: ICompanyData, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/cus/adminsignin",
        config,
        rejectWithValue,
        Data
    )

})

export const fetchAdmin = createAsyncThunk("user/admin/fetchadmin", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "user/admin/fetchadmin",
        config,
        rejectWithValue,
    )
})

export const fetchSubscription = createAsyncThunk("subscription/admin/fetchplans", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "subscription/admin/fetchplans",
        config,
        rejectWithValue,
    )
})

export const fetchCategory = createAsyncThunk('job/admin/categorylist', async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "job/admin/categorylist",
        config,
        rejectWithValue,
    )
})

export const editUsers = createAsyncThunk("user/admin/editUser", async (data: IUsers, { rejectWithValue }) => {
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

export const AdminListJob = createAsyncThunk("job/admin/joblist", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "job/admin/joblist",
        config,
        rejectWithValue,
    )

})
export const AdminListApplicants = createAsyncThunk("job/admin/applicanlist", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "job/admin/applicanlist",
        config,
        rejectWithValue,
    )

})

export const ListAdmin = createAsyncThunk("user/admin/listadmin", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "user/admin/listadmin",
        config,
        rejectWithValue
    )
})
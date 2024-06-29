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



export const userSignin = createAsyncThunk("auth/cus/signin", async (userdata: IUsers, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/cus/signin",
        config,
        rejectWithValue,
        userdata
    )

})

export const userSignup = createAsyncThunk("auth/cus/signup", async (userdata: IUsers, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/cus/signup",
        config,
        rejectWithValue,
        userdata
    )

})
export const userSignupWtihGoogle = createAsyncThunk("auth/cus/signupwithgoogle", async (credentialId: string, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/cus/signupwithgoogle",
        config,
        rejectWithValue,
        { id: credentialId }
    )

})

export const forgot = createAsyncThunk("auth/cus/forgot", async (email: string, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "auth/cus/forgot",
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
export const fetchSchedule=createAsyncThunk('job/user/fetchschedule',async (id:string,{rejectWithValue})=>{
    return reduxRequest(
        "get",
        `job/user/fetchschedule/${id}`,
        config,
        rejectWithValue,
    )
})

export const applicantList=createAsyncThunk('job/user/applicantlist',async (_,{rejectWithValue})=>{
    return reduxRequest(
        "get",
        "job/user/applicantlist",
        config,
        rejectWithValue,
    )
})

export const userApplicantList=createAsyncThunk('job/user/fetchapplicants',async (id:string,{rejectWithValue})=>{
    return reduxRequest(
        "get",
        `job/user/fetchapplicants/${id}`,
        config,
        rejectWithValue,
    )
})
export const userNotificatinoList=createAsyncThunk('notification/user/fetchnotification',async (id:string,{rejectWithValue})=>{
    return reduxRequest(
        "get",
        `notification/user/fetchnotification/${id}`,
        config,
        rejectWithValue,
    )
})




export const logout = createAsyncThunk("auth/cus/logout", async (_, { rejectWithValue }) => {
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

export const ChatList = createAsyncThunk("chat/getroom",async (id:string,{rejectWithValue})=>{
    return reduxRequest(
        "get",
        `chat/company/getroom?id=${id}`,
        config,
        rejectWithValue,
        
    )
})

export const allMessageList = createAsyncThunk("chat/listmessages",async (id:string,{rejectWithValue})=>{
    return reduxRequest(
        "get",
        `chat/company/listmessages?id=${id}`,
        config,
        rejectWithValue,
        
    )
})

export const UlistUsers = createAsyncThunk("user/listusers", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "user/listusers",
        config,
        rejectWithValue
    )
})



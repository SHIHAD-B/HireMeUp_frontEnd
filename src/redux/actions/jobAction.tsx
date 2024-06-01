import { createAsyncThunk } from "@reduxjs/toolkit";
import { config} from "../../interfaces/config/configuration";
import { reduxRequest } from "../../interfaces/config/api";


export const ListJob = createAsyncThunk("job/user/joblist", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "job/user/joblist",
        config,
        rejectWithValue,
    )

})
export const fecthJob = createAsyncThunk("job/company/fetchjob/:id", async (id:any, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        `job/company/fetchjob/${id}`,
        config,
        rejectWithValue,
    )

})

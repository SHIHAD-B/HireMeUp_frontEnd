import { createAsyncThunk } from "@reduxjs/toolkit";
import { config} from "../../interfaces/config/configuration";
import { reduxRequest } from "../../interfaces/config/api";
import { IJobData } from "@/interfaces/IUser";

export const addJob = createAsyncThunk("job/addjob", async (Data: IJobData, { rejectWithValue }) => {
    return reduxRequest(
        "post",
        "job/addjob",
        config,
        rejectWithValue,
        Data
    )

})

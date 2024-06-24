
import { createSlice } from '@reduxjs/toolkit';
import { ListJob,fecthJob } from '../actions/jobAction';
import { AdminListJob } from '../actions/adminAction';
import { IJobData } from '@/interfaces/IUser';




const JobSlice = createSlice({
    name: 'job',
    initialState: {
        data: null as IJobData[] | null,
        error: null as string | null,
        loading: false as boolean
    },
    reducers: {
        makeErrorDisable: (state) => {
            state.error = null;
        },
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(ListJob.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(ListJob.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as IJobData[];
                state.error = null
            })
            .addCase(ListJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
            .addCase(fecthJob.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fecthJob.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as IJobData[];
                state.error = null
            })
            .addCase(fecthJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
            .addCase(AdminListJob.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(AdminListJob.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as IJobData[];
                state.error = null
            })
            .addCase(AdminListJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }
},
);

export const { makeErrorDisable } = JobSlice.actions;
export default JobSlice.reducer;

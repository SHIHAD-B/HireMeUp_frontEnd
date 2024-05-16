
import { createSlice } from '@reduxjs/toolkit';
import { addJob } from '../actions/jobAction';
import { IJobData } from '@/interfaces/IUser';




const JobSlice = createSlice({
    name: 'job',
    initialState: {
        data: null as IJobData | null,
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
            .addCase(addJob.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(addJob.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as IJobData;
                state.error = null
            })
            .addCase(addJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }
},
);

export const { makeErrorDisable } = JobSlice.actions;
export default JobSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import {  IApplicants } from '@/interfaces/IUser';
import { applicantList } from '../actions/userAction';





const applicantListSlice = createSlice({
    name: 'applicationList',
    initialState: {
        data: null as IApplicants[] | null,
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
            .addCase(applicantList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(applicantList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applicantList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           
    }
},
);

export const { makeErrorDisable } = applicantListSlice.actions;
export default applicantListSlice.reducer;

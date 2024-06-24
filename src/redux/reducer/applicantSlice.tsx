
import { createSlice } from '@reduxjs/toolkit';
import {  IApplicants } from '@/interfaces/IUser';
import { userApplicantList } from '../actions/userAction';
import { companyApplicantList } from '../actions/companyAction';
import { AdminListApplicants } from '../actions/adminAction';





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
            .addCase(userApplicantList.fulfilled, (state, action) => {
                console.log(action.payload,"payload of the applicants")
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(userApplicantList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userApplicantList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(companyApplicantList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(companyApplicantList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(companyApplicantList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(AdminListApplicants.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(AdminListApplicants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AdminListApplicants.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           
    }
},
);

export const { makeErrorDisable } = applicantListSlice.actions;
export default applicantListSlice.reducer;

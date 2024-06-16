
import { createSlice } from '@reduxjs/toolkit';
import {  ICompanyData } from '@/interfaces/IUser';
import { companyList } from '../actions/companyAction';
import { companyUserList } from '../actions/companyAction';





const companyListSlice = createSlice({
    name: 'companyList',
    initialState: {
        data: null as ICompanyData[] | null,
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
            .addCase(companyList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(companyList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(companyList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(companyUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(companyUserList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(companyUserList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           

    }
},
);

export const { makeErrorDisable } = companyListSlice.actions;
export default companyListSlice.reducer;

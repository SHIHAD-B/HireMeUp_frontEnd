
import { createSlice } from '@reduxjs/toolkit';
import {  ICategory } from '@/interfaces/IUser';
import { fetchCategory } from '../actions/adminAction';
import { UfetchCategory } from '../actions/userAction';





const companyListSlice = createSlice({
    name: 'categoryList',
    initialState: {
        data: null as ICategory[] | null,
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
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(UfetchCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(UfetchCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UfetchCategory.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           

    }
},
);

export const { makeErrorDisable } = companyListSlice.actions;
export default companyListSlice.reducer;

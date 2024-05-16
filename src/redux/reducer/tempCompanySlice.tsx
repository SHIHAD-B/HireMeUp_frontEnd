
import { createSlice } from '@reduxjs/toolkit';
import { ICompanyData } from '../../interfaces/IUser';
import { companySignup,companyforgot } from '../actions/companyAction';


const tempCompanySlice = createSlice({
    name: 'tempCompany',
    initialState: {
        companydata: null as ICompanyData | null,
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

            .addCase(companySignup.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(companySignup.fulfilled, (state, action) => {
                console.log(action.payload,"data when sign in company")
                state.loading = false;
                state.companydata = action.payload as ICompanyData;
                state.error = null
            })
            .addCase(companySignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
            .addCase(companyforgot.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(companyforgot.fulfilled, (state, action) => {
                state.loading = false;
                state.companydata = action.payload as ICompanyData;
                state.error = null
            })
            .addCase(companyforgot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })



    },
});

export const { makeErrorDisable} = tempCompanySlice.actions;
export default tempCompanySlice.reducer;

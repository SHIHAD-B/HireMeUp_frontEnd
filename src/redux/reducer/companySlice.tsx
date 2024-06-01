
import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../actions/userAction';
import { companySignin, fetchCompany,editCompany } from '../actions/companyAction';
import { ICompanyData } from '../../interfaces/IUser';




const CompanySlice = createSlice({
    name: 'company',
    initialState: {
        data: null as ICompanyData | null,
        error: null as string | null,
        loading: false as boolean
    },
    reducers: {
        makeErrorDisable: (state) => {
            state.error = null;
        },
        setCompanyData: (state, action) => {
            state.data = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as ICompanyData;
                state.error = null
            })
            .addCase(fetchCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompany.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as ICompanyData;
                state.error = null
            })
            .addCase(editCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editCompany.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(companySignin.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(companySignin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as ICompanyData;
                state.error = null
            })
            .addCase(companySignin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
            .addCase(logout.fulfilled, (state) => {
                state.data = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

    }
},
);

export const { makeErrorDisable,setCompanyData } = CompanySlice.actions;
export default CompanySlice.reducer;

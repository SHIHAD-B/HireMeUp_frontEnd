
import { createSlice } from '@reduxjs/toolkit';
import { adminSignin, fetchAdmin } from '../actions/adminAction';
import { IAdminData } from '@/interfaces/IUser';




const CompanySlice = createSlice({
    name: 'admin',
    initialState: {
        admin: null as IAdminData | null,
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
            .addCase(fetchAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload as IAdminData;
                state.error = null
            })
            .addCase(fetchAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdmin.rejected, (state, action) => {
                state.admin = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(adminSignin.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(adminSignin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload as IAdminData;
                state.error = null
            })
            .addCase(adminSignin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })

    }
},
);

export const { makeErrorDisable } = CompanySlice.actions;
export default CompanySlice.reducer;

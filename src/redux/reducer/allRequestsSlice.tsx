
import { createSlice } from '@reduxjs/toolkit';
import { IRequests } from '@/interfaces/IUser';
import { allRequests } from '../actions/companyAction';





const requestSlice = createSlice({
    name: 'allRequests',
    initialState: {
        data: null as IRequests[] | null,
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
            .addCase(allRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(allRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(allRequests.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           

    }
},
);

export const { makeErrorDisable } = requestSlice.actions;
export default requestSlice.reducer;

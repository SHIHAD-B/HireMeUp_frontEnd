import { createSlice } from '@reduxjs/toolkit';
import { IPlans } from '@/interfaces/IUser';
import { fetchSubscription } from '../actions/adminAction';





const subscriptionListSlice = createSlice({
    name: 'subscriptionList',
    initialState: {
        data: null as IPlans[] | null,
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
            .addCase(fetchSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(fetchSubscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubscription.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           

    }
},
);

export const { makeErrorDisable } = subscriptionListSlice.actions;
export default subscriptionListSlice.reducer;

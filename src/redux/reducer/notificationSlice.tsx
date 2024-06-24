
import { createSlice } from '@reduxjs/toolkit';
import { userNotificatinoList } from '../actions/userAction';
import {  INotification } from '@/interfaces/IUser';




const NotificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data: [] as INotification[], 
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
            .addCase(userNotificatinoList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload ;
                state.error = null
            })
            .addCase(userNotificatinoList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userNotificatinoList.rejected, (state, action) => {
                state.data = [];
                state.loading = false;
                state.error = action.payload as string;
            })
           

    }
},
);

export const { makeErrorDisable } = NotificationSlice.actions;
export default NotificationSlice.reducer;

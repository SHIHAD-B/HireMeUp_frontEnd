
import { createSlice } from '@reduxjs/toolkit';
import {  IUserData } from '@/interfaces/IUser';
import { listUsers } from '../actions/userAction';





const usersListSlice = createSlice({
    name: 'usersList',
    initialState: {
        data: null as IUserData[] | null,
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
            .addCase(listUsers.fulfilled, (state, action) => {
                console.log(action.payload,"action from list user")
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(listUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listUsers.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           

    }
},
);

export const { makeErrorDisable } = usersListSlice.actions;
export default usersListSlice.reducer;

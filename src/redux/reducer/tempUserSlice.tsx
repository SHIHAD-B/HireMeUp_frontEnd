
import { createSlice } from '@reduxjs/toolkit';
import { IUsers } from '../../interfaces/IUser';
import { userSignup, forgot } from '../actions/userAction';





const tempUserSlice = createSlice({
    name: 'tempUser',
    initialState: {
        user: null as IUsers | null,
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

            .addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                console.log(action.payload, "data in teh usersignup of the temp user")
                state.loading = false;
                state.user = action.payload as IUsers;
                state.error = null
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
            .addCase(forgot.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(forgot.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as IUsers;
                state.error = null
            })
            .addCase(forgot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })



    },
});

export const { makeErrorDisable } = tempUserSlice.actions;
export default tempUserSlice.reducer;

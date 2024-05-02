
import { createSlice } from '@reduxjs/toolkit';
import { IUserData } from '../../interfaces/IUser';
import { fetchUser, userSignin,userSignup,logout } from '../actions/userAction';





const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null as IUserData | null,
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
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as unknown as IUserData;
                state.error = null
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(userSignin.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(userSignin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as IUserData;
                state.error = null
            })
            .addCase(userSignin.rejected, (state, action) => {
                console.log(action,"action from backend")
                state.loading = false;
                state.error = action.payload as string
            })
            .addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as IUserData;
                state.error = null
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
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

export const { makeErrorDisable } = userSlice.actions;
export default userSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import { IUsers } from '../../interfaces/IUser';
import { fetchUser, userSignin, logout,userSignupWtihGoogle,editUsers } from '../actions/userAction';





const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null as IUsers | null,
        error: null as string | null,
        loading: false as boolean
    },
    reducers: {
        makeErrorDisable: (state) => {
            state.error = null;
        },
        setUserData: (state, action) => {
            state.user = action.payload as IUsers ;
            state.error = null;
            state.loading = false;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as unknown as IUsers;
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
            .addCase(editUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as unknown as IUsers;
                state.error = null
            })
            .addCase(editUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUsers.rejected, (state, action) => {
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
                state.user = action.payload as IUsers;
                state.error = null
            })
            .addCase(userSignin.rejected, (state, action) => {
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
            .addCase(userSignupWtihGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as IUsers;
                state.error = null
            })
            .addCase(userSignupWtihGoogle.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(userSignupWtihGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


    }
},
);

export const { makeErrorDisable, setUserData } = userSlice.actions;
export default userSlice.reducer;

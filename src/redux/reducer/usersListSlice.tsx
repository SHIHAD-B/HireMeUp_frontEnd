
import { createSlice } from '@reduxjs/toolkit';
import { IUsers } from '@/interfaces/IUser';
import { listUsers } from '../actions/adminAction';
import { UlistUsers } from '../actions/userAction';





const usersListSlice = createSlice({
    name: 'usersList',
    initialState: {
        data: null as IUsers[] | null,
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
            .addCase(UlistUsers.fulfilled, (state, action) => {
              
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(UlistUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UlistUsers.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           

    }
},
);

export const { makeErrorDisable } = usersListSlice.actions;
export default usersListSlice.reducer;

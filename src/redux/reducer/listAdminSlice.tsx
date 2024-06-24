
import { createSlice } from '@reduxjs/toolkit';
import { IAdmin } from '@/interfaces/IUser';
import { ListAdmin } from '../actions/adminAction';





const adminListSlice = createSlice({
    name: 'adminList',
    initialState: {
        data: null as IAdmin[] | null,
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
            .addCase(ListAdmin.fulfilled, (state, action) => {
          
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(ListAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ListAdmin.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
          
           
    }
},
);

export const { makeErrorDisable } = adminListSlice.actions;
export default adminListSlice.reducer;

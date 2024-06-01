
import { createSlice } from '@reduxjs/toolkit';
import { IEmployee } from '@/interfaces/IUser';
import { employeeList } from '../actions/companyAction';





const employeeListSlice = createSlice({
    name: 'employeeList',
    initialState: {
        data: null as IEmployee[] | null,
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
            .addCase(employeeList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(employeeList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employeeList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           

    }
},
);

export const { makeErrorDisable } = employeeListSlice.actions;
export default employeeListSlice.reducer;

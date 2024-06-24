
import { createSlice } from '@reduxjs/toolkit';
import { fetchSchedule } from '../actions/userAction';
import { companyFetchSchedule } from '../actions/companyAction';
import { ISchedule } from '@/interfaces/IUser';




const ScheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        data: null as ISchedule[] | null,
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
            .addCase(fetchSchedule.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as ISchedule[];
                state.error = null
            })
            .addCase(fetchSchedule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
            .addCase(companyFetchSchedule.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(companyFetchSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as ISchedule[];
                state.error = null
            })
            .addCase(companyFetchSchedule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })

    }
},
);

export const { makeErrorDisable } = ScheduleSlice.actions;
export default ScheduleSlice.reducer;

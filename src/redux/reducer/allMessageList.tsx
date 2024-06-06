
import { createSlice } from '@reduxjs/toolkit';
import { IChat, IMessage, IPopulatedChat,  } from '@/interfaces/IUser';
import { allMessageList } from '../actions/userAction';





const allMessagesListSlice = createSlice({
    name: 'allMessageList',
    initialState: {
        data: null as IPopulatedChat[] | null,
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
            .addCase(allMessageList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(allMessageList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(allMessageList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           

    }
},
);

export const { makeErrorDisable } = allMessagesListSlice.actions;
export default allMessagesListSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import { IChat,  } from '@/interfaces/IUser';
import { ChatList } from '../actions/userAction';





const chatListSlice = createSlice({
    name: 'chatList',
    initialState: {
        data: null as IChat[] | null,
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
            .addCase(ChatList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as any ;
                state.error = null
            })
            .addCase(ChatList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ChatList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
           

    }
},
);

export const { makeErrorDisable } = chatListSlice.actions;
export default chatListSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../interfaces/IUser';



const initialState: IUserData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const tempUserSlice = createSlice({
    name: 'tempUser',
    initialState,
    reducers: {
        setUsersData: (state, action: PayloadAction<IUserData>) => {
            return action.payload;
        },
        clearUserData: state => {
            return initialState;
        },
    },
});

export const { setUsersData, clearUserData } = tempUserSlice.actions;
export default tempUserSlice.reducer;

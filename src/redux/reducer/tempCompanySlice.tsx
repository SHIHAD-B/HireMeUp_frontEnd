
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompanyData } from '../../interfaces/IUser';



const initialState: ICompanyData = {
    companyname: "",
    email: "",
    password: "",
    document: "",
    confirmPassword: ""
};

const tempCompanySlice = createSlice({
    name: 'tempCompany',
    initialState,
    reducers: {
        setCompanyDatas: (state, action: PayloadAction<ICompanyData>) => {
            return action.payload;
        },
        clearCompanyDatas: state => {
            return initialState;
        },
    },
});

export const { setCompanyDatas, clearCompanyDatas } = tempCompanySlice.actions;
export default tempCompanySlice.reducer;

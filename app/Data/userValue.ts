import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../sotre';
import {SqlData} from '../../Context/Interface';
export interface ReduxUserDetail {
    userAdm: string;
    userClass: string;
    userRoll: string;
    userSession: string;
    userStatus: string;
    userPhone: string;
    userFatherName: string;
    userName: string;
    userSection: string;
    userTrans: string;
    userHost: string;
    url: string;
    userData?: SqlData;
}

const initialState: ReduxUserDetail = {
    userAdm: '',
    userClass: '',
    userRoll: '',
    userSession: '',
    userStatus: '',
    userPhone: '',
    userFatherName: '',
    userName: '',
    userSection: '',
    userTrans: '',
    userHost: '',
    // url: 'https://reactnativebackend-2mi8.onrender.com/',
    url: 'http://192.168.1.6:4003/',
    userData: undefined,
};

export const dataSlice = createSlice({
    name: 'ReduxUserDetails',
    initialState,
    reducers: {
        // Setters
        setuserAdm: (state, value) => {
            state.userAdm = value.payload;
        },
        setFetchData: (state, value: PayloadAction<any>) => {
            state.userData = value.payload;
        },
        setuserClass: (state, value: PayloadAction<string>) => {
            state.userClass = value.payload;
        },

        setuserRoll: (state, value: PayloadAction<string>) => {
            state.userRoll = value.payload;
        },

        setuserSession: (state, value: PayloadAction<string>) => {
            state.userSession = value.payload;
        },

        setuserStatus: (state, value: PayloadAction<string>) => {
            state.userStatus = value.payload;
        },

        setuserPhone: (state, value: PayloadAction<string>) => {
            state.userPhone = value.payload;
        },

        setuserFatherName: (state, value: PayloadAction<string>) => {
            state.userFatherName = value.payload;
        },

        setuserName: (state, value: PayloadAction<string>) => {
            state.userName = value.payload;
        },

        setuserSection: (state, value: PayloadAction<string>) => {
            state.userSection = value.payload;
        },

        setuserTrans: (state, value: PayloadAction<string>) => {
            state.userTrans = value.payload;
        },
        setuserHost: (state, value: PayloadAction<string>) => {
            state.userHost = value.payload;
        },
    },
});

export const {
    setuserAdm,
    setuserClass,
    setuserRoll,
    setuserSession,
    setuserStatus,
    setuserPhone,
    setuserFatherName,
    setuserName,
    setuserSection,
    setuserTrans,
    setuserHost,
    setFetchData,
} = dataSlice.actions;

export const dataSelector = (state: RootState) => state.ReduxUserDetails;
export default dataSlice.reducer;

import {
    createSlice
} from "@reduxjs/toolkit"


const successInfo = "Zarejestrowano, przekierowanie za 2s";


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,              
        isFetching: false,
        error: false,
        messageSucces: false,
        messageFail: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        registerStart: (state) => {
            state.isFetching = true;
            state.messageSuccess = null;
            state.messageFail = null;
        },
        registerSuccess: (state) => {
            state.isFetching = false;
            state.messageSucces= successInfo; 
            state.messageFails= null; 

        },
        registerFailure: (state,action) => {
            state.isFetching = false;
            state.messageFail= action.payload.error;
            state.messageSucces= null; 
            
        },         
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFailure, 
    registerStart,
    registerSuccess,
    registerFailure   
} = userSlice.actions

export default userSlice.reducer;
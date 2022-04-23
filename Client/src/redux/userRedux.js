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
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        addressUpdate: (state,action) =>{
            state.currentUser.address = action.payload.address
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        registerStart: (state) => {
            state.isFetching = true;
            state.messageSuccess = false;
            state.messageFail = false;
        },
        registerSuccess: (state) => {
            state.isFetching = false;
            state.messageSucces= successInfo; 
            state.messageFails= false; 

        },
        registerFailure: (state,action) => {
            state.isFetching = false;
            state.messageFail= action.payload.error;
            state.messageSucces= false; 
            
        },         
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFailure, 
    registerStart,
    registerSuccess,
    registerFailure,
    addressUpdate   
} = userSlice.actions

export default userSlice.reducer;
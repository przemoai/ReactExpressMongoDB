import {
    createSlice
} from "@reduxjs/toolkit"


const successInfo = "Zarejestrowano, przekierowanie za 2s";


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        orders:null,                      
        isFetching: false,
        error: false,
        messageSuccess: false,
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
        userOrders:(state,action)=>{
            state.orders = action.payload
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
            state.messageSuccess= successInfo; 
            state.messageFail= false; 

        },
        registerFailure: (state,action) => {
            state.isFetching = false;
            state.messageFail= action.payload.error;
            state.messageSuccess= false; 
            
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
    addressUpdate,
    userOrders   
} = userSlice.actions

export default userSlice.reducer;
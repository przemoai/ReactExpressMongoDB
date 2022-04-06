import {
    createSlice
} from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,              
        isFetching: false,
        error: false,
        message: false
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
            state.message = false;
        },
        registerSuccess: (state) => {
            state.isFetching = false;  
            state.message = "Pomyślnie utworzono konto"                     
        },
        registerFailure: (state) => {
            state.isFetching = false;
            
            
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
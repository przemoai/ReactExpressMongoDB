import {
    publicRequest
} from "../requestMethods"
import {
    loginStart,loginFailure,loginSuccess,
    registerStart,registerSuccess,registerFailure
} from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const register = async (dispatch,user) => {
    dispatch(registerStart())    
    console.log(user)
    try{
        const res = await publicRequest.post("/auth/register", user)
        dispatch(registerSuccess(res.data))
    }catch(err){
        dispatch(registerFailure(err.response.data))
        console.log(err.response.data)
        
    }        

}


export const logout = () => {     
    try{
        localStorage.clear();
        window.location.reload(true);

    }catch(err){
        console.log(err)
    }
    
 

    
}
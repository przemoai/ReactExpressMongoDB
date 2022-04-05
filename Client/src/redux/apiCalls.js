import {
    publicRequest
} from "../requestMethods"
import {
    loginStart,
    loginFailure,
    loginSuccess,
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
export const logout = () => {     
    try{
        localStorage.clear();
        window.location.reload(true);

    }catch(err){
        console.log(err)
    }
    
        
    
}
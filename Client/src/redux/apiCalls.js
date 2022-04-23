import {
    publicRequest
} from "../requestMethods"
import {
    loginStart,
    loginFailure,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailure,
    addressUpdate
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

export const register = async (dispatch, user) => {
    dispatch(registerStart())
    try {
        const res = await publicRequest.post("/auth/register", user)
        dispatch(registerSuccess(res.data))
        setTimeout(() => {
            login(dispatch, user)
        }, 2000);

    } catch (err) {
        dispatch(registerFailure(err.response.data))
        console.log(err.response.data)
    }
}

export const updateUserAddress = async(dispatch,userId,token,address)=>{
    
    try {        
        const res = await publicRequest.put("/users/"+userId,{address},{
            headers:{
                'token': token
            }
        })
        dispatch(addressUpdate(res.data))
        
    }catch(err){

    }

}


export const logout = () => {
    try {
        localStorage.clear();
        window.location.reload(true);

    } catch (err) {
        console.log(err)
    }




}
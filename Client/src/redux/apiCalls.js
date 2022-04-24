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
    addressUpdate,
    userOrders
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

export const updateUserAddress = async (dispatch, userId, token, address) => {

    try {
        const res = await publicRequest.put("/users/" + userId, {
            address
        }, {
            headers: {
                'token': token
            }
        })
        dispatch(addressUpdate(res.data))
    } catch (err) {}
}

export const makeOrder = async (dispatch, userId, token, products, address,total) => {

    try {
        // console.log(userId)
        // console.log(token)
        // console.log(products)
        // console.log(address)
        // console.log(total)
        const res = await publicRequest.post("/orders", {
            userId,products,address,total
        }, {
            headers: {
                'token': token
            }
        })
        // dispatch(addressUpdate(res.data))
        // console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}





export const getUserOrders = async (dispatch, user) => {
    try {
        const res = await publicRequest.get("http://localhost:5000/api/orders/find/" + user._id, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        })
        dispatch(userOrders(res.data))
    } catch (err) {

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
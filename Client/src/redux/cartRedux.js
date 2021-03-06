import {
    createSlice
} from "@reduxjs/toolkit"


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            const item = state.products.find((product) => product._id === action.payload._id);
            console.log(item)

            if (item) {
                console.log("TAKI PRZEDMIOT JUZ JEST W KOSZYKU")
                item.quantity += action.payload.quantity
            } else {

                state.products.push(action.payload)
            }
            state.quantity += action.payload.quantity
            state.total += action.payload.price * action.payload.quantity
        },
        changeQuantity: (state, action) => {

            const item = state.products.find((product) => product._id === action.payload.itemId);
            // console.log(action.payload.action)
            if (item) {
                if (action.payload.action === "inc") {                   
                    item.quantity += 1
                    state.quantity += 1
                    state.total += item.price
                }
                if (action.payload.action === "dec" && item.quantity > 1) {                    
                    item.quantity -= 1
                    state.quantity -= 1
                    state.total -= item.price
                }
            }
        },
        clearCart: (state) => {
            state.quantity = 0
            state.products = []
            state.total = 0
        }
    },
})

export const {
    addProduct,
    clearCart,
    changeQuantity
} = cartSlice.actions
export default cartSlice.reducer;
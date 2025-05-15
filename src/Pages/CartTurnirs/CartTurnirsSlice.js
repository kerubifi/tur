import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCartTurnirs = createAsyncThunk(
    'user/fetchCartTurnirs',
    async (params, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/cartTurnirs`)
        const result = await response.json()
        return result
    }
)

export const addCartTurnirs = createAsyncThunk(
    'user/addCartTurnirs',
    async (turnir, thunkAPI) => {
        await fetch(`http://localhost:5000/cartTurnirs`, {
            method: "POST",
            body: JSON.stringify(turnir),
            headers: {
                "Content-Type": "application/json"
            }
        })
        thunkAPI.dispatch(fetchCartTurnirs())
    }
)

export const delCartTurnirs = createAsyncThunk(
    'user/delCartTurnirs',
    async (id, thunkAPI) => {
        await fetch(`http://localhost:5000/cartTurnirs/${id}`, {
            method: "DELETE",
        })
        thunkAPI.dispatch(fetchCartTurnirs())
    }
)

const initialState = {
    cartTurnirs: [],
}

export const CartTurnirsSlice = createSlice({
    name: "CartTurnirsSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCartTurnirs.fulfilled, (state, action) => {
            const data = action.payload
            state.cartTurnirs = data
        })
    },
})

export default CartTurnirsSlice.reducer
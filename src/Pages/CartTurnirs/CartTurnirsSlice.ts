import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Turnirtype } from "../../types/Types.ts";
import { AppDispatch } from "../../store.ts"

export const fetchCartTurnirs = createAsyncThunk<Turnirtype[]>(
    'user/fetchCartTurnirs',
    async (params, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/cartTurnirs`)
        const result = await response.json()
        return result
    }
)

export const addCartTurnirs = createAsyncThunk<void, Turnirtype, { dispatch: AppDispatch }>(
    'user/addCartTurnirs',
    async (turnir, { dispatch }) => {
        await fetch(`http://localhost:5000/cartTurnirs`, {
            method: "POST",
            body: JSON.stringify(turnir),
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(fetchCartTurnirs())
    }
)

export const delCartTurnirs = createAsyncThunk<void, number, { dispatch: AppDispatch }>(
    'user/delCartTurnirs',
    async (id, thunkAPI) => {
        await fetch(`http://localhost:5000/cartTurnirs/${id}`, {
            method: "DELETE",
        })
        thunkAPI.dispatch(fetchCartTurnirs())
    }
)

type initialStateType = {
    cartTurnirs: Turnirtype[]
}


const initialState: initialStateType = {
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
    reducers: {},
})

export default CartTurnirsSlice.reducer
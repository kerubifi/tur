import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Turnirtype } from "../../types/Types.ts";
import { AppDispatch } from "../../store.ts";

export const fetchFavorite = createAsyncThunk<Turnirtype[]>(
    'user/fetchFavorite',
    async (params, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/favorite`)
        const result = await response.json()
        return result
    }
)

export const addFavorite = createAsyncThunk<void, Turnirtype, { dispatch: AppDispatch }>(
    'user/addFavorite',
    async (turnir, { dispatch }) => {
        await fetch(`http://localhost:5000/favorite`, {
            method: "POST",
            body: JSON.stringify(turnir),
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(fetchFavorite())
    }
)

export const delFavorite = createAsyncThunk<void, number, { dispatch: AppDispatch }>(
    'user/delFavorite',
    async (id, { dispatch }) => {
        await fetch(`http://localhost:5000/favorite/${id}`, {
            method: "DELETE",
        })
        dispatch(fetchFavorite())
    }
)

type initialStateType = {
    favorite: Turnirtype[]
}

const initialState: initialStateType = {
    favorite: [],
}

export const favoriteSlice = createSlice({
    name: "favoriteSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchFavorite.fulfilled, (state, action) => {
            const data = action.payload
            state.favorite = data
        })
    },
    reducers: {},
})

export default favoriteSlice.reducer
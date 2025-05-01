import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavorite = createAsyncThunk(
    'user/fetchFavorite',
    async (params, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/favorite`)
        const result = await response.json()
        return result
    }
)

export const addFavorite = createAsyncThunk(
    'user/addFavorite',
    async (turnir, thunkAPI) => {
        await fetch(`http://localhost:5000/favorite`, {
            method: "POST",
            body: JSON.stringify(turnir),
            headers: {
                "Content-Type": "application/json"
            }
        })
        thunkAPI.dispatch(fetchFavorite())
    }
)

export const delFavorite = createAsyncThunk(
    'user/delFavorite',
    async (id, thunkAPI) => {
        await fetch(`http://localhost:5000/favorite/${id}`, {
            method: "DELETE",
        })
        thunkAPI.dispatch(fetchFavorite())
    }
)

const initialState = {
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
})

export default favoriteSlice.reducer
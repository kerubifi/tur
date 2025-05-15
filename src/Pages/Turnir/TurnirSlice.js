import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTurnir = createAsyncThunk(
    'user/fetchTurnir',
    async (id, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/turnirs/${id}`)
        const result = await response.json()
        return result
    }
)

const initialState = {
    turnir: null,
}

export const turnirSlice = createSlice({
    name: "turnirSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTurnir.fulfilled, (state, action) => {
            const data = action.payload
            state.turnir = data
        })
    },
})

export default turnirSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Turnirtype } from "../../types/Types.ts";

export const fetchTurnirs = createAsyncThunk<Turnirtype[], string>(
    'user/fetchTurnirs',
    async (params, thunkAPI) => {
        // const response = await fetch(`http://localhost:5000/turnirs?${params}`)
        const response = await fetch(`http://localhost:5000/turnirs`)
        const result = await response.json()
        return result
    },
)

type initialStateType = {
    turnirs: Turnirtype[]
}

const initialState: initialStateType = {
    turnirs: [],
}

export const turnirsSlice = createSlice({
    name: "turnirsSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTurnirs.fulfilled, (state, action) => {
            const data = action.payload
            state.turnirs = data
        })
    },
    reducers: {},
})

export default turnirsSlice.reducer
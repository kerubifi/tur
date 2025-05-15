import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTurnirs = createAsyncThunk(
    'user/fetchTurnirs',
    async (params, thunkAPI) => {
        const { inputName, category, sort } = params
        const sortQuery= sort ? `&_sort=participants&_order=${sort}` : ''
        const response = await fetch(`http://localhost:5000/turnirs?name_like=${inputName}&category_like=${category}${sortQuery}`)
        const result = await response.json()
        return result
    },
)

const initialState = {
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
})

export default turnirsSlice.reducer
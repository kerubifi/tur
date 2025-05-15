import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTurnir = createAsyncThunk(
    'user/fetchTurnir',
    async (id, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/turnirs/${id}`)
        const result = await response.json()
        return result
    }
)

export const fetchComments = createAsyncThunk(
    'user/fetchComments',
    async (id, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/comments?turnirId=${id}`)
        const result = await response.json()
        return result
    }
)

export const addComments = createAsyncThunk(
    'user/addComments',
    async (comment, { dispatch }) => {
        await fetch(`http://localhost:5000/comments`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                "Content-Type": "application/json"
            },
        })
        dispatch(fetchComments(comment.turnirId))
    }
)

const initialState = {
    turnir: null,
    comments: []
}

export const turnirSlice = createSlice({
    name: "turnirSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTurnir.fulfilled, (state, action) => {
            const data = action.payload
            state.turnir = data
        })
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            const data = action.payload
            state.comments = data
        })
    },

})

export default turnirSlice.reducer
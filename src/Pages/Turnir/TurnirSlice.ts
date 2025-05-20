import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Turnirtype } from "../../types/Types.ts";
import { AppDispatch } from "../../store.ts";

export const fetchTurnir = createAsyncThunk<Turnirtype, string>(
    'user/fetchTurnir',
    async (id, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/turnirs/${id}`)
        const result = await response.json()
        return result
    }
)

type CommentType = {
    UserName?: string,
    text: string,
    turnirId: number,
    date: string,
    id?: number
}

export const fetchComments = createAsyncThunk<CommentType[], number>(
    'user/fetchComments',
    async (id, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/comments?turnirId=${id}`)
        const result = await response.json()
        return result
    }
)

export const addComments = createAsyncThunk<void, CommentType, { dispatch: AppDispatch }>(
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

type initialStateType = {
    turnir: Turnirtype | null
    comments: CommentType[]
}

const initialState: initialStateType = {
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
    reducers: {},
})

export default turnirSlice.reducer
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

type GameType = {
    game: string
    maxpeopleInGroupe: number
    id: number
}

export const fetchGames = createAsyncThunk<GameType[]>(
    'user/fetchGames',
    async (params, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/games`)
        const result = await response.json()
        return result
    }
)

export const addTurnir = createAsyncThunk<void, Turnirtype>(
    'user/addTurnir',
    async (turnir) => {
        await fetch(`http://localhost:5000/turnirs`, {
            method: 'POST',
            body: JSON.stringify(turnir),
            headers: {
                "Content-Type": "application/json"
            },
        })
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
    games: GameType[]
}

const initialState: initialStateType = {
    turnir: null,
    comments: [],
    games: []
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
        builder.addCase(fetchGames.fulfilled, (state, action) => {
            const data = action.payload
            state.games = data
        })
    },
    reducers: {},
})

export default turnirSlice.reducer
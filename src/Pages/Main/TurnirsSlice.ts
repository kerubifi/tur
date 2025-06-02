import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Turnirtype } from "../../types/Types.ts";
import { AppDispatch } from "../../store.ts";
import { useAppSelector } from "../../reduxHooks.ts";

export const fetchTurnirs = createAsyncThunk<Turnirtype[], string>(
    'main/fetchTurnirs',
    async (params, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/turnirs?${params}`)
        const result = await response.json()
        return result
    },
)

export const fetchturnirkol = createAsyncThunk<number>(
    'main/fetchturnirkol',
    async () => {
        const response = await fetch(`http://localhost:5000/turnirkol`)
        const result = await response.json()
        return result
    }
)

export const Changeturnirkol = createAsyncThunk<void>(
    'main/Changeturnirkol',
    async () => {
        const num = useAppSelector((state) => state.turnirs.num)
        num[0].num = num[0].num + 1
        await fetch(`http://localhost:5000/turnirkol/1`, {
            method: "PUT",
            body: JSON.stringify(num),
            headers: {
                "Content-Type": "application/json"
            }
        })

    }
)

type initialStateType = {
    turnirs: Turnirtype[]
    num: number
}

const initialState: initialStateType = {
    turnirs: [],
    num: 0
}

export const turnirsSlice = createSlice({
    name: "turnirsSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTurnirs.fulfilled, (state, action) => {
            const data = action.payload
            state.turnirs = data
        })
        builder.addCase(fetchturnirkol.fulfilled, (state, action) => {
            const data = action.payload
            state.num = data
        })
    },
    reducers: {},
})

export default turnirsSlice.reducer
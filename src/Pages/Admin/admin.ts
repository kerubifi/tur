import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDataType, UserProfileType } from "../../types/Types.ts";
import { AppDispatch } from "../../store.ts";
import { UpdateUserProfile } from "../Profile/ProfileSlice.ts";

export const fetchUsers = createAsyncThunk<UserDataType[]>(
    'user/fetchUsers',
    async (params, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/usersData`)
        const result = await response.json()
        return result
    }
)

export const fetchUsersProfile = createAsyncThunk<UserProfileType, UserDataType>(
    'user/fetchUsersProfile',
    async (user, thunkAPI) => {
        const response = await fetch(`http://localhost:5000/users?id=${user.id}`)
        const result = await response.json()
        return result
    }
)

export const ChangeUser = createAsyncThunk<void, UserDataType, { dispatch: AppDispatch }>(
    'user/ChangeUser',
    async (user, { dispatch }) => {
        await fetch(`http://localhost:5000/usersData/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(fetchUsers())
    }
)

export const ChangeUserProfile = createAsyncThunk<void, UserProfileType, { dispatch: AppDispatch }>(
    'user/ChangeUserProfile',
    async (user, { dispatch }) => {
        await fetch(`http://localhost:5000/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(fetchUsers())
    }
)

type initialStateType = {
    userData: UserDataType[]
    userProfile: UserProfileType | null

}

const initialState: initialStateType = {
    userData: [],
    userProfile: null
}

export const turnirSlice = createSlice({
    name: "turnirSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            const data = action.payload
            state.userData = data
        })
        builder.addCase(fetchUsersProfile.fulfilled, (state, action) => {
            const data = action.payload[0]
            state.userProfile = data
        })
    },
    reducers: {},
})

export default turnirSlice.reducer
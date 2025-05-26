import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserProfileType, UserType } from "../../types/Types";
import { AppDispatch } from "../../store";

export const FirstUserProfile = createAsyncThunk<UserProfileType, number>(
    'user/FirstUserProfile',
    async (id) => {
        const response = await fetch(`http://localhost:5000/users?id=${id}`)
        const result = await response.json()
        return result
    }
)

export const UpdateUserProfile = createAsyncThunk<UserProfileType, number>(
    'user/UpdateUserProfile',
    async (id) => {
        const response = await fetch(`http://localhost:5000/users?id=${id}`)
        const result = await response.json()
        return result
    }
)


export const RegistrationProfile = createAsyncThunk<UserProfileType, UserProfileType>(
    'user/RegistrationProfile',
    async (userForm) => {
        const resultProfile = await fetch(`http://localhost:5000/users`, {
            method: 'POST',
            body: JSON.stringify(userForm),
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await resultProfile.json()
        return data
    }
)

export const ChangeFavorite = createAsyncThunk<void, UserType, { dispatch: AppDispatch }>(
    'user/ChangeFavorite',
    async (turnirs, { dispatch }) => {
        await fetch(`http://localhost:5000/users/${turnirs.id}`, {
            method: "PUT",
            body: JSON.stringify(turnirs),
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(UpdateUserProfile(turnirs.id!))
    }
)

export const ChangeCart = createAsyncThunk<void, UserType, { dispatch: AppDispatch }>(
    'user/ChangeCart',
    async (turnirs, { dispatch }) => {
        await fetch(`http://localhost:5000/users/${turnirs.id}`, {
            method: "PUT",
            body: JSON.stringify(turnirs),
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(UpdateUserProfile(turnirs.id!))
    }
)

type initialStateType = {
    userProfile: UserProfileType | null
}

const initialState: initialStateType = {
    userProfile: null,
}

export const registrationSlice = createSlice({
    name: "registrationSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(RegistrationProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload
            localStorage.setItem('user', JSON.stringify(state.userProfile[0]))
            window.location.reload()
        })
        builder.addCase(UpdateUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(state.userProfile[0]))
        })
        builder.addCase(FirstUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload
            localStorage.setItem('user', JSON.stringify(state.userProfile[0]))
            window.location.reload()
        })
    },
    reducers: {},
})

export default registrationSlice.reducer
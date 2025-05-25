import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/Types";
import { AppDispatch } from "../../store";

const getUsers = async (): Promise<UserType[]> => {
    const response = await fetch(`http://localhost:5000/users`)
    return await response.json()
}

export const LoginUser = createAsyncThunk<UserType, UserType, { rejectValue: { error: string } }>(
    'user/Login',
    async (userForm, { rejectWithValue }) => {
        const users: UserType[] = await getUsers()
        const checkUserLogin = users.find(
            (user) => user.login === userForm.login && user.password === userForm.password
        )
        if (checkUserLogin) {
            return checkUserLogin
        } else {
            return rejectWithValue({ error: "Неправильный логин или пароль" })
        }
    }
)


export const Registration = createAsyncThunk<UserType, UserType, { rejectValue: { error: string } }>(
    'user/Registration',
    async (userForm, { rejectWithValue }) => {
        const users: UserType[] = await getUsers()
        const checkUser = users.some(
            (user) => user.login === userForm.login || user.mail === userForm.mail
        )
        if (checkUser) {
            return rejectWithValue({ error: "Такой пользователь уже зарегестрирован" })
        } else {
            userForm.role = 0
            userForm.favorite = []
            userForm.cartTurnirs = []
            userForm.turnirs = []
            userForm.userTurnir = []
            const result = await fetch(`http://localhost:5000/users`, {
                method: 'POST',
                body: JSON.stringify(userForm),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await result.json()
            return data
        }
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
        dispatch(LoginUser(turnirs))
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
        dispatch(LoginUser(turnirs))
    }
)

type initialStateType = {
    user: UserType | null
    error: null | string
}

const initialState: initialStateType = {
    user: null,
    error: null
}

export const registrationSlice = createSlice({
    name: "registrationSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(Registration.fulfilled, (state, action) => {
            state.error = null
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state.user))
            window.location.reload()
        })
        builder.addCase(Registration.rejected, (state, action) => {
            state.error = action.payload ? action.payload.error : null
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.error = null
            state.user = action.payload
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(state.user))
            window.location.reload()
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.error = action.payload ? action.payload.error : null
        })
    },
    reducers: {},
})

export default registrationSlice.reducer
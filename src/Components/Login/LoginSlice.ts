import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

        if (userForm.password !== userForm.password2) {
            return rejectWithValue({ error: "Пароли не совпадают" })
        }

        if (checkUser) {
            return rejectWithValue({ error: "Такой пользователь уже зарегестрирован" })
        } else {
            userForm.role = 0
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

type UserType = {
    login: string
    password: string
    password2?: string
    mail?: string
    id?: number
    role?: number
}

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
        })
        builder.addCase(Registration.rejected, (state, action) => {
            state.error = action.payload ? action.payload.error : null
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.error = null
            state.user = action.payload
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.error = action.payload ? action.payload.error : null
        })
    },
    reducers: {},
})

export default registrationSlice.reducer
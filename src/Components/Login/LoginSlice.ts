import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDataType, UserProfileType, UserType } from "../../types/Types.ts";
import { AppDispatch } from "../../store";
import { RegistrationProfile, FirstUserProfile } from "../../Pages/Profile/ProfileSlice.ts";

const getUsers = async (): Promise<UserType[]> => {
    const response = await fetch(`http://localhost:5000/usersData`)
    return await response.json()
}

export const LoginUser = createAsyncThunk<UserDataType, UserType, { rejectValue: { error: string }, dispatch: AppDispatch }>(
    'user/Login',
    async (userForm, { rejectWithValue, dispatch }) => {
        const users: UserType[] = await getUsers()
        const checkUserLogin = users.find(
            (user) => user.login === userForm.login && user.password === userForm.password
        )
        if (checkUserLogin) {
            dispatch(FirstUserProfile(checkUserLogin.id!))
            return checkUserLogin
        } else {
            return rejectWithValue({ error: "Неправильный логин или пароль" })
        }
    }
)


export const Registration = createAsyncThunk<UserDataType, UserType, { rejectValue: { error: string }, dispatch: AppDispatch }>(
    'user/Registration',
    async (userForm, { rejectWithValue, dispatch }) => {
        const users: UserDataType[] = await getUsers()
        const checkUser = users.some(
            (user) => user.login === userForm.login || user.mail === userForm.mail
        )
        if (checkUser) {
            return rejectWithValue({ error: "Такой пользователь уже зарегестрирован" })
        } else {
            const userData: UserDataType = {
                login: userForm.login,
                password: userForm.password,
                mail: userForm.mail,
                role: 0
            }
            const userProfile: UserProfileType = {
                login: userForm.login,
                favorite: [],
                cartTurnirs: [],
                userTurnir: [],
                role: 0
            }
            const result = await fetch(`http://localhost:5000/usersData`, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await result.json()
            dispatch(RegistrationProfile(userProfile))
            return data
        }
    }
)

type initialStateType = {
    userData: UserDataType | null
    error: null | string
}

const initialState: initialStateType = {
    userData: null,
    error: null
}

export const registrationSlice = createSlice({
    name: "registrationSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(Registration.fulfilled, (state, action) => {
            state.error = null
            state.userData = action.payload
        })
        builder.addCase(Registration.rejected, (state, action) => {
            state.error = action.payload ? action.payload.error : null
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.error = null
            state.userData = action.payload
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.error = action.payload ? action.payload.error : null
        })
    },
    reducers: {},
})

export default registrationSlice.reducer
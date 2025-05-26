import { configureStore } from "@reduxjs/toolkit";
import turnirsReducer from "./Pages/Main/TurnirsSlice.ts"
import turnirReducer from "./Pages/Turnir/TurnirSlice.ts"
import userDataReduser from "./Components/Login/LoginSlice.ts"
import userProdileReduser from "./Pages/Profile/ProfileSlice.ts"
import usersReduser from "./Pages/Admin/admin.ts"
export const store = configureStore({
    reducer: {
        turnirs: turnirsReducer,
        turnir: turnirReducer,
        userData: userDataReduser,
        userProfile: userProdileReduser,
        users: usersReduser
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
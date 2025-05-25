import { configureStore } from "@reduxjs/toolkit";
import turnirsReducer from "./Pages/Main/TurnirsSlice.ts"
import turnirReducer from "./Pages/Turnir/TurnirSlice.ts"
import userReduser from "./Components/Login/LoginSlice.ts"
export const store = configureStore({
    reducer: {
        turnirs: turnirsReducer,
        turnir: turnirReducer,
        user: userReduser
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
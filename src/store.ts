import { configureStore } from "@reduxjs/toolkit";
import favoriteReduser from "./Pages/Favorite/FavoriteSlice.ts";
import turnirsReducer from "./Pages/Main/TurnirsSlice.ts"
import cartTurnirsReducer from "./Pages/CartTurnirs/CartTurnirsSlice.ts"
import turnirReducer from "./Pages/Turnir/TurnirSlice.ts"
import userReduser from "./Components/Login/LoginSlice.ts"
export const store = configureStore({
    reducer: {
        favorite: favoriteReduser,
        turnirs: turnirsReducer,
        cartTurnirs: cartTurnirsReducer,
        turnir: turnirReducer,
        user: userReduser
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
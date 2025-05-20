import { configureStore } from "@reduxjs/toolkit";
import favoriteReduser from "./Pages/Favorite/FavoriteSlice.ts";
import turnirsReducer from "./Pages/Main/TurnirsSlice.ts"
import cartTurnirsReducer from "./Pages/CartTurnirs/CartTurnirsSlice.ts"
import turnirReducer from "./Pages/Turnir/TurnirSlice.ts"
export const store = configureStore({
    reducer: {
        favorite: favoriteReduser,
        turnirs: turnirsReducer,
        cartTurnirs: cartTurnirsReducer,
        turnir: turnirReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
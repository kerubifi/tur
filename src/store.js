import { configureStore } from "@reduxjs/toolkit";
import favoriteReduser from "./Pages/Favorite/FavoriteSlice";
import turnirsReducer from "./Pages/Main/TurnirsSlice"
import cartTurnirsReducer from "./Pages/CartTurnirs/CartTurnirsSlice"
import turnirReducer from "./Pages/Turnir/TurnirSlice"
export const store = configureStore({
    reducer: {
        favorite: favoriteReduser,
        turnirs: turnirsReducer,
        cartTurnirs: cartTurnirsReducer,
        turnir: turnirReducer
    },
})
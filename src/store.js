import { configureStore } from "@reduxjs/toolkit";
import favoriteReduser from "./Pages/Favorite/FavoriteSlice";
import turnirsReducer from "./Pages/Main/TurnirsSlice"

export const store = configureStore({
    reducer: { favorite: favoriteReduser, turnirs: turnirsReducer },
})
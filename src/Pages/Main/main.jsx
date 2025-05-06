import { useDispatch, useSelector } from "react-redux"
import { Card } from "../../Components/Card"
import { addFavorite, delFavorite } from "../Favorite/FavoriteSlice"

export const Main = () => {
    const favorite = useSelector((state) => state.favorite.favorite)
    const turnirs = useSelector((state) => state.turnirs.turnirs)

    const dispatch = useDispatch()

    const ChangeFavourites = (turnir) => {
        if (favorite.some(el => el.id === turnir.id)) {
          dispatch(delFavorite(turnir.id))
        }
        else {
          dispatch(addFavorite(turnir))
        }
      }
    
    return (
        <div>
            <div className='cardsbox'>
                {turnirs.map((turnir) => (
                    <Card
                        key={turnir.id}
                        ChangeFavourites={ChangeFavourites}
                        favoriteIds={favorite.map(i => i.id)}
                        turnir={turnir}/>
                ))}
            </div>
        </div>
    )
}
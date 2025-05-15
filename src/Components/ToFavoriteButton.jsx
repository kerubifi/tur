import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, delFavorite } from '../Pages/Favorite/FavoriteSlice'

export const ToFavoriteButton = ({ turnir }) => {
    const favorite = useSelector((state) => state.favorite.favorite)

    const dispatch = useDispatch()

    const favoriteIds = favorite.map(i => i.id)

    const ChangeFavourites = () => {
        if (favorite.some(el => el.id === turnir.id)) {
            dispatch(delFavorite(turnir.id))
        }
        else {
            dispatch(addFavorite(turnir))
        }
    }

    return (
        <div>
            {favoriteIds && <div ><img onClick={ChangeFavourites} src={favoriteIds.includes(turnir.id) ? require('../images/iconStar.png') : require('../images/iconEmptyStar.png')} alt='izbranoe' width={10} /></div>}
        </div>
    )
}
import { useAppDispatch, useAppSelector } from '../reduxHooks.ts'
import { addFavorite, delFavorite } from '../Pages/Favorite/FavoriteSlice.ts'
import { Turnirtype } from '../types/Types.ts'

export const ToFavoriteButton = ({ turnir }: { turnir: Turnirtype }) => {
    const favorite = useAppSelector((state) => state.favorite.favorite)

    const dispatch = useAppDispatch()

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
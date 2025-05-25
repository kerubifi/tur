import { useAppDispatch} from '../reduxHooks.ts'
import { Turnirtype } from '../types/Types.ts'
import { ChangeFavorite } from './Login/LoginSlice.ts'

export const ToFavoriteButton = ({ turnir }: { turnir: Turnirtype }) => {
    const user = JSON.parse(localStorage.getItem('user')!)

    const dispatch = useAppDispatch()

    const favoriteIds = user?.favorite!.map(i => i.id)

    const ChangeFavourites = () => {
        if (user) {
            if (user?.favorite?.some(el => el.id === turnir.id)) {
                const t = user.favorite.filter(e => e.id !== turnir.id)
                const newUserData = { ...user, favorite: t }
                dispatch(ChangeFavorite(newUserData))
            }
            else {
                let t = [turnir]
                user?.favorite?.map(x => t = [...t, x])
                const newUserData = { ...user, favorite: t }
                dispatch(ChangeFavorite(newUserData))
            }
        }
    }

    return (
        <div>
            {favoriteIds && <div ><img onClick={ChangeFavourites} src={favoriteIds.includes(turnir.id) ? require('../images/iconStar.png') : require('../images/iconEmptyStar.png')} alt='izbranoe' width={10} /></div>}
        </div>
    )
}
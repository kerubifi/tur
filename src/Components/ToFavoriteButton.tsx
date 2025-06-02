import { useAppDispatch, useAppSelector } from '../reduxHooks.ts'
import { Turnirtype, UserProfileType } from '../types/Types.ts'
import { ChangeUser } from '../Pages/Profile/ProfileSlice.ts'

export const ToFavoriteButton = ({ turnir }: { turnir: Turnirtype }) => {
    const user = JSON.parse(localStorage.getItem('user')!)
    const s = useAppSelector((state) => state.userProfile.userProfile)//!!!
    const dispatch = useAppDispatch()
    const favoriteIds = user?.favorite!.map(i => i.id)
    const ChangeFavourites = () => {
        if (user) {
            if (user?.favorite?.some(el => el.id === turnir.id)) {
                const t = user.favorite.filter(e => e.id !== turnir.id)
                const newUserData = { ...user, favorite: t }
                dispatch(ChangeUser(newUserData))
            }
            else {
                let t = [turnir]
                user?.favorite?.map(x => t = [...t, x])
                const newUserData = { ...user, favorite: t }
                dispatch(ChangeUser(newUserData))
            }
        }
    }

    return (
        <div className='FavoriteIcon'>
            {favoriteIds && <div><img onClick={ChangeFavourites} src={favoriteIds.includes(turnir.id) ? require('../images/iconStar.png') : require('../images/iconEmptyStar.png')} alt='izbranoe' width={15} /></div>}
        </div>
    )
}
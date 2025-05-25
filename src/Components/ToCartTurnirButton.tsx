import { useAppDispatch} from "../reduxHooks.ts"
import { Turnirtype } from "../types/Types.ts"
import { ChangeCart } from "./Login/LoginSlice.ts"

export const ToCartTurnirButton = ({ turnir }: { turnir: Turnirtype }) => {
    const user = JSON.parse(localStorage.getItem('user')!)

    const dispatch = useAppDispatch()

    const cartTurnirsIds = user?.cartTurnirs!.map(i => i.id)

    const ChangeCartTurnirs = () => {
        if (user) {
            if (user?.cartTurnirs?.some(el => el.id === turnir.id)) {
                const t = user.cartTurnirs.filter(e => e.id !== turnir.id)
                const newUserData = { ...user, cartTurnirs: t }
                dispatch(ChangeCart(newUserData))
            }
            else {
                let t = [turnir]
                user?.cartTurnirs?.map(x => t = [...t, x])
                const newUserData = { ...user, cartTurnirs: t }
                dispatch(ChangeCart(newUserData))
            }
        }
    }

    return (
        <div>
            {cartTurnirsIds && <button onClick={ChangeCartTurnirs} className={cartTurnirsIds && cartTurnirsIds.includes(turnir.id) ? 'activeCart' : 'noactiveCart'}>Участвовать</button>}
        </div>
    )
}
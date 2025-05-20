import { useAppDispatch, useAppSelector } from "../reduxHooks.ts"
import { addCartTurnirs, delCartTurnirs } from "../Pages/CartTurnirs/CartTurnirsSlice.ts"
import { Turnirtype } from "../types/Types.ts"

export const ToCartTurnirButton = ({ turnir }: { turnir: Turnirtype }) => {
    const cartTurnirs = useAppSelector((state) => state.cartTurnirs.cartTurnirs)

    const dispatch = useAppDispatch()

    const cartTurnirsIds = cartTurnirs.map(i => i.id)

    const ChangeCartTurnirs = () => {
        if (cartTurnirs.some(el => el.id === turnir.id)) {
            dispatch(delCartTurnirs(turnir.id))
        }
        else {
            dispatch(addCartTurnirs(turnir))
        }
    }

    return (
        <div>
            {cartTurnirsIds && <button onClick={ChangeCartTurnirs} className={cartTurnirsIds && cartTurnirsIds.includes(turnir.id) ? 'activeCart' : 'noactiveCart'}>Участвовать</button>}
        </div>
    )
}
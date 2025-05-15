import { useDispatch, useSelector } from "react-redux"
import { addCartTurnirs, delCartTurnirs } from "../Pages/CartTurnirs/CartTurnirsSlice"

export const ToCartTurnirButton = ({ turnir }) => {
    const cartTurnirs = useSelector((state) => state.cartTurnirs.cartTurnirs)

    const dispatch = useDispatch()

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
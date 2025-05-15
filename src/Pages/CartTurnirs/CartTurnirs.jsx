import { useSelector } from "react-redux"
import { Card } from "../../Components/Card"

export const CartTurnirs = () => {
    const cartTurnirs = useSelector((state) => state.cartTurnirs.cartTurnirs)

    return (
        <div>
            <div className='cardsbox'>
                {cartTurnirs.length ?
                    cartTurnirs.map((el) => (
                        <Card
                            key={el.id}
                            turnir={el}
                        />

                    )) : <p>no</p>}
            </div>
        </div>
    )
}
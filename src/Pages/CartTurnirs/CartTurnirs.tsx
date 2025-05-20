import { useAppSelector } from "../../reduxHooks.ts"
import { Card } from "../../Components/Card.tsx"

export const CartTurnirs = () => {
    const cartTurnirs = useAppSelector((state) => state.cartTurnirs.cartTurnirs)

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
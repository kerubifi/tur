import { Card } from "../../Components/Card.tsx"

export const CartTurnirs = () => {
    const user = JSON.parse(localStorage.getItem('user')!)

    return (
        <div>
            <div className='cardsbox'>
                {user?.cartTurnirs!.length ?
                    user.cartTurnirs.map((el) => (
                        <Card
                            key={el.id}
                            turnir={el}
                        />

                    )) : <p>no</p>}
            </div>
        </div>
    )
}
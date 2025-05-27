import { Card } from "../../Components/Card.tsx"

export const CartTurnirs = () => {
    const user = JSON.parse(localStorage.getItem('user')!)

    return (
        <div className="Cart">
            <div className='cardsbox'>
                {user?.cartTurnirs!.length ?
                    user.cartTurnirs.map((el) => (
                        <Card
                            key={el.id}
                            turnir={el}
                        />

                    )) : <p>Тут пока ничего нет</p>}
            </div>
        </div>
    )
}
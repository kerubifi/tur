import { useNavigate } from "react-router-dom"
import { Card } from "../../Components/Card.tsx"
import { useEffect } from "react"

export const CartTurnirs = () => {
    const user = JSON.parse(localStorage.getItem('user')!)

    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

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
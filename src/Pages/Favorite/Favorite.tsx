import { useNavigate } from "react-router-dom"
import { Card } from "../../Components/Card.tsx"
import { useEffect } from "react"

export const Favorite = () => {
    const user = JSON.parse(localStorage.getItem('user')!)

    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    return (
        <div className="favorite">
            <div className='cardsbox'>
                {user?.favorite!.length ?
                    user.favorite.map((el) => (
                        <Card
                            key={el.id}
                            turnir={el}
                        />

                    )) : <p>Тут пока ничего нет</p>}
            </div>
        </div>
    )
}
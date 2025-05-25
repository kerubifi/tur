import { Card } from "../../Components/Card.tsx"

export const Favorite = () => {
    const user = JSON.parse(localStorage.getItem('user')!)

    return (
        <div>
            <div className='cardsbox'>
                {user?.favorite!.length ?
                    user.favorite.map((el) => (
                        <Card
                            key={el.id}
                            turnir={el}
                        />

                    )) : <p>no</p>}
            </div>
        </div>
    )
}
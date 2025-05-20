import { useAppSelector } from "../../reduxHooks.ts"
import { Card } from "../../Components/Card.tsx"

export const Favorite = () => {
    const favorite = useAppSelector((state) => state.favorite.favorite)

    return (
        <div>
            <div className='cardsbox'>
                {favorite.length ?
                    favorite.map((el) => (
                        <Card
                            key={el.id}
                            turnir={el}
                        />

                    )) : <p>no</p>}
            </div>
        </div>
    )
}
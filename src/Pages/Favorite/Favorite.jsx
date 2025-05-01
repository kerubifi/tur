import { useSelector } from "react-redux"
import { Card } from "../../Components/Card"

export const Favorite = () => {
    const favorite = useSelector((state) => state.favorite.favorite)

    return (
        <div>
            <div className='cardsbox'>
                {console.log(favorite)}
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
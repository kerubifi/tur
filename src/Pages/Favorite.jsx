import { Card } from "../Components/Card"

export const Favorite = ({ favoriteTurnirs }) => {
    return (
        <div>
            <div className='cardsbox'>
                {favoriteTurnirs.length ?
                    favoriteTurnirs.map((el) => (
                        <Card
                            key={el.id}
                            turnir={el}
                            />
                            
                    )) : <p>no</p>}
            </div>
        </div>
    )
}
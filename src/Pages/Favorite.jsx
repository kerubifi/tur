import { Card } from "../Components/Card"

export const Favorite = ({ FavoriteCards }) => {
    return (
        <div>
            <div className='cardsbox'>
                {FavoriteCards.length ?
                    FavoriteCards.map((el) => (
                        <Card
                            id={el.id}
                            key={el.id}
                            name={el.name}
                            category={el.category}
                            groupse={el.groupse}
                            peopleInGroup={el.peopleInGroupe}
                            prize={el.prize}
                            img={el.img}
                            alt={el.alt} />
                            
                    )) : <p>no</p>}
            </div>
        </div>
    )
}
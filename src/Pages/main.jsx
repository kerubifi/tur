import { Card } from "../Components/Card"
import { Filter } from "../Components/Filter"


export const Main = ({handleChandeCategory, ChangeFavourites, favourites, turnirs, category, openFilter}) => {
    return (
        <div>
            {openFilter && <Filter handleChandeCategory={handleChandeCategory} category={category} />}
            <div className='cardsbox'>
                {turnirs.map((el) => (
                    <Card
                        ChangeFavourites={ChangeFavourites}
                        favourites={favourites}
                        id={el.id}
                        key={el.id}
                        name={el.name}
                        category={el.category}
                        groupse={el.groupse}
                        peopleInGroup={el.peopleInGroupe}
                        prize={el.prize}
                        img={el.img}
                        alt={el.alt} />
                ))}
            </div>
        </div>
    )
}
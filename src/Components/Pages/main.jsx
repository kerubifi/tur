import { Card } from "../Card"
import { Filter } from "../Filter"


export const Main = ({handleChandeCategory, ChangeFavourites, favourites, filterArray, category, openFilter}) => {
    return (
        <div>
            {openFilter && <Filter handleChandeCategory={handleChandeCategory} category={category} />}
            <div className='cardsbox'>
                {filterArray.map((el) => (
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
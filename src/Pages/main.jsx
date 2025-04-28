import { Card } from "../Components/Card"
import { Filter } from "../Components/Filter"


export const Main = ({handleChandeCategory, ChangeFavourites, favoriteIds, turnirs, category, openFilter}) => {
    return (
        <div>
            {openFilter && <Filter handleChandeCategory={handleChandeCategory} category={category} />}
            <div className='cardsbox'>
                {turnirs.map((turnir) => (
                    <Card
                        ChangeFavourites={ChangeFavourites}
                        favoriteIds={favoriteIds}
                        turnir={turnir}/>
                ))}
            </div>
        </div>
    )
}
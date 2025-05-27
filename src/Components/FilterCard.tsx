import { Fimg } from "../images/games/Fimg"
import { SearchParamsType } from "../types/Types"

type GameType = {
    game: string
    maxpeopleInGroupe: number
    id: number
}

export const FilterCard = ({ handleChangeFilters, searchParams, game }) => {
    const handleSelectGame = (name: string) => {
        handleChangeFilters('game', name)
    }
    return (
        <div className='filteruse'>
            {searchParams.get('game') === game.game ? <img onClick={() => handleSelectGame(game.game)} className="Filteractive" src={require("../images/yes.png")} alt="yes" width={35} /> : ''}
            <div onClick={() => handleSelectGame(game.game)} className="FilterIcon"><Fimg game={game.game} /></div>
        </div>)
}
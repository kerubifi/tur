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
    return (<div className='filterIcon'>

        <button onClick={() => handleSelectGame(game.game)} className={searchParams.get('game') === game.game ? 'active' : ''}><Fimg game={game.game} /></button>
    </div>)
}
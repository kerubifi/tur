import { Link } from 'react-router-dom'
import { Fimg } from '../images/games/Fimg'
import { ToCartTurnirButton } from './ToCartTurnirButton'
import { ToFavoriteButton } from './ToFavoriteButton'

export const Card = ({  turnir }) => {
    const { id, name, prize, groupse, peopleInGroupe, participants } = turnir
    return (
        <div className='cards'>
            <div className='izflex'>
                <Link to={`/turnir/${id}`}>
                    <div><Fimg name={name} /></div>
                </Link>
                <ToFavoriteButton turnir={turnir} />
            </div>
            <Link to={`/turnir/${id}`}>
                <div>{name}</div>
                <div>Приз: {prize}</div>
                <div>Количество команд {groupse}, по {peopleInGroupe} человек</div>
                <div>Осталось свободных мест {peopleInGroupe * groupse - participants}</div>
            </Link>
            <ToCartTurnirButton turnir={turnir} />
        </div>
    )
}

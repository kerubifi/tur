import { Link } from 'react-router-dom'
import { Fimg } from '../images/games/Fimg'
import { ToCartTurnirButton } from './ToCartTurnirButton.tsx'
import { ToFavoriteButton } from './ToFavoriteButton.tsx'
import { memo } from 'react'
import { Turnirtype } from '../types/Types.ts'

type Props = {
    turnir: Turnirtype
}

export const Card = memo(({ turnir }: Props) => {
    const { id, game, prize, groupse, peopleInGroupe, participants, date } = turnir
    return (
        <div className='cards'>
            <div className='izflex'>
                <Link className='link' to={`/turnir/${id}`}>
                    <div><Fimg game={game} /></div>
                </Link>
                <ToFavoriteButton turnir={turnir} />
            </div>
            <Link className='link' to={`/turnir/${id}`}>
                <div>{game}</div>
                <div>Время проведения: {date}</div>
                <div>Приз: {prize}</div>
                <div>Количество команд {groupse}, по {peopleInGroupe} человек</div>
                <div>Осталось свободных мест {peopleInGroupe * groupse - participants}</div>
            </Link>
            <ToCartTurnirButton turnir={turnir} />
        </div>
    )
})

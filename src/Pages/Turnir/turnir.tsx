import { useParams } from "react-router-dom"
import { fetchTurnir } from "./TurnirSlice.ts"
import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { useEffect } from "react"
import { Fimg } from "../../images/games/Fimg"
import { ToCartTurnirButton } from "../../Components/ToCartTurnirButton.tsx"
import { ToFavoriteButton } from "../../Components/ToFavoriteButton.tsx"
import { TurnirComents } from "./comments/Comments.tsx"
import './Turnir.css'
import { CardParticipants } from "./CardParticipants.tsx"

export const Turnir = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()

    const turnir = useAppSelector((state) => state.turnir.turnir)

    useEffect(() => {
        if (id) { dispatch(fetchTurnir(id)) }
    }, [])

    if (!turnir) {
        return <div>loaing</div>
    }

    const { game, prize, groupse, peopleInGroupe, participants, date, comment } = turnir
    return (
        <div className="Turnir">
            <div className="minTurnir">
                <div className="TurnirData">
                    <div className="TurnirInfo">
                        <div className='izflex'>
                            <div><Fimg game={game} /></div>
                            <div className="ComFavoriteIcon">
                                <ToFavoriteButton turnir={turnir} />
                            </div>
                        </div>
                        <div>Турнир по игре: {game}</div>
                        <div>Коментарий от автора: {comment}</div>
                        <div>Время проведения: {date}</div>
                        <div>Приз: {prize}</div>
                        <div>Количество команд {groupse}, по {peopleInGroupe} человек</div>
                    </div>
                    <div className="TurnirComment">
                        <p>Комментарии пользователей</p>
                        <TurnirComents turnirId={turnir.id!} />
                    </div>
                </div>
                <div className="TurnirParticipants">
                    <div>
                        <p>Список участников</p>
                        <p>{peopleInGroupe * groupse - participants?.length!}/{peopleInGroupe * groupse}</p>
                        <ToCartTurnirButton turnir={turnir} />
                    </div>
                    <div className="parm">
                        <hr></hr>
                        {turnir.participants?.map(e => (
                            <CardParticipants comment={e} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useParams } from "react-router-dom"
import { fetchTurnir } from "./TurnirSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Fimg } from "../../images/games/Fimg"
import { ToCartTurnirButton } from "../../Components/ToCartTurnirButton"
import { ToFavoriteButton } from "../../Components/ToFavoriteButton"
import { TurnirComents } from "./comments/Comments"

export const Turnir = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { turnir } = useSelector((state) => state.turnir)

    useEffect(() => {
        dispatch(fetchTurnir(id))
    }, [])

    if (!turnir) {
        return <div>loaing</div>
    }

    const { name, prize, groupse, peopleInGroupe, participants } = turnir

    return (
        <>
            <div>
                <div className='izflex'>
                    <div><Fimg name={name} /></div>
                    <ToFavoriteButton turnir={turnir} />
                </div>
                <div>{name}</div>
                <div>Приз: {prize}</div>
                <div>Количество команд {groupse}, по {peopleInGroupe} человек</div>
                <div>Осталось свободных мест {peopleInGroupe * groupse - participants}</div>
                <ToCartTurnirButton turnir={turnir} />
            </div>
            <TurnirComents />
        </>
    )
}
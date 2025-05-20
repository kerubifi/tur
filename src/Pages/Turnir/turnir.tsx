import { useParams } from "react-router-dom"
import { fetchTurnir } from "./TurnirSlice.ts"
import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { useEffect } from "react"
import { Fimg } from "../../images/games/Fimg"
import { ToCartTurnirButton } from "../../Components/ToCartTurnirButton.tsx"
import { ToFavoriteButton } from "../../Components/ToFavoriteButton.tsx"
import { TurnirComents } from "./comments/Comments.tsx"

export const Turnir = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()

    const { turnir } = useAppSelector((state) => state.turnir)

    useEffect(() => {
        if (id) { dispatch(fetchTurnir(id)) }
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
            <TurnirComents turnirId={turnir.id} />
        </>
    )
}
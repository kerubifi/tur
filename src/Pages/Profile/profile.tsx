import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { useEffect } from "react"
import { fetchOneUser, fetchUsersProfile } from "../Admin/admin.ts"
import { Card } from "../../Components/Card.tsx"
import './profile.css'

export const Profile = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const user = JSON.parse(localStorage.getItem('user')!)
    const oneUser = useAppSelector((state) => state.users.oneUser)
    const userProfile = useAppSelector((state) => state.users.userProfile)

    useEffect(() => {
        if (id) { dispatch(fetchUsersProfile(Number(id))) }
    }, [id])

    return (
        <div className="Profile">
            <div className="minProfile">
                <div className="User info">
                    <h3>{userProfile?.login}</h3>
                </div>
                <p>пользователь участвует</p>
                <div className="parTurnir , cardsbox">
                    {userProfile?.cartTurnirs!.length ?
                        userProfile.cartTurnirs.map((el) => (
                            <Card
                                key={el.id}
                                turnir={el}
                            />

                        )) : <p>Тут пока ничего нет</p>}
                </div>
                <p>Турниры пользователя</p>
                <div className="UserTurnir , cardsbox">
                    {userProfile?.userTurnir!.length ?
                        userProfile.userTurnir.map((el) => (
                            <Card
                                key={el.id}
                                turnir={el}
                            />

                        )) : <p>Тут пока ничего нет</p>}
                </div>
            </div>
        </div>
    )
}
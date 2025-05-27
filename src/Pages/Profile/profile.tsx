import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { useEffect } from "react"
import { fetchOneUser, fetchUsersProfile } from "../Admin/admin.ts"

export const Profile = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const user = JSON.parse(localStorage.getItem('user')!)
    const oneUser = useAppSelector((state) => state.users.oneUser)
    const userProfile = useAppSelector((state) => state.users.userProfile)

    useEffect(() => {
        if (id) { dispatch(fetchUsersProfile(Number(id))) }
    }, [id])

    useEffect(() => {
        if (user && user.login === userProfile?.login) {
            dispatch(fetchOneUser(user.id))
        }
    }, [userProfile])
    return (
        <div className="Profile">
            <div>{userProfile?.login}</div>
            {user && user.login === userProfile?.login ? <div>
                <div>{oneUser?.password}</div>
                <div>{oneUser?.mail}</div>
                {user.role ? <div>{user.role}</div> : ''}
            </div> : <div>{userProfile?.login}</div>}
        </div>
    )
}
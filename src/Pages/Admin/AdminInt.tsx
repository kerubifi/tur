import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { fetchUsers } from "./admin.ts"
import { UserCard } from "../../Components/UserCard.tsx"

export const AdminInt = ({ menu }: { menu: number }) => {
    const users = useAppSelector((state) => state.users.userData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    //const user = JSON.parse(localStorage.getItem('user')!)
    switch (menu) {
        case 1:
            return (
                <>
                    <div className='cardsbox'>
                        {users.map((u) => (

                            <UserCard
                                key={u.id}
                                user={u} />
                        ))}
                    </div>
                </>
            )


        case 2:
            return (
                <>
                    <span>2</span>
                </>
            )
        case 3:
            return (
                <>
                    <span>3</span>
                </>
            )
        default:
            break;
    }

}
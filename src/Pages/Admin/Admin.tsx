import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { fetchUsers } from "./admin.ts"
import { UserCard } from "../../Components/UserCard.tsx"
import { AdminInt } from "./AdminInt.tsx"
import { useNavigate } from "react-router-dom"

export const Admin = () => {
    const users = useAppSelector((state) => state.users.userData)
    const dispatch = useAppDispatch()

    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (!user) {
    //         navigate("/")
    //     }
    // }, [user])

    const [menu, setmenu] = useState(1)
    return (
        <div className="Admin">
            <div>
                <div onClick={() => setmenu(1)}>1</div>
                <div onClick={() => setmenu(2)}>2</div>
                <div onClick={() => setmenu(3)}>3</div>
            </div>
            <AdminInt menu={menu} />
        </div>
    )

}
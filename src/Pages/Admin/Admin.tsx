import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { fetchUsers } from "./admin.ts"
import { UserCard } from "../../Components/UserCard.tsx"
import { AdminInt } from "./AdminInt.tsx"

export const Admin = () => {
    const users = useAppSelector((state) => state.users.userData)
    const dispatch = useAppDispatch()

    const [menu, setmenu] = useState(1)
    return(
        <div className="Admin">
            <div>
                <div onClick={()=> setmenu(1)}>1</div>
                <div onClick={()=> setmenu(2)}>2</div>
                <div onClick={()=> setmenu(3)}>3</div>
            </div>
            <AdminInt menu={menu} />
        </div>
    )

}
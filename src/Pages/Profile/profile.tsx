import { UserCard } from "../../Components/UserCard.tsx"

export const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user')!)
    return (
        <>
            <UserCard user={user} />
        </>
    )
}
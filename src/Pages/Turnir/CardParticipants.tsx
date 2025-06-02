import { Link } from "react-router-dom";
import { ParticipantsType } from "../../types/Types";

export const CardParticipants = (comments) => {
    const { login, Nickname, comment, id } = comments.comment
    return (
        <div className="CardParticipants">
            <Link to={`/userprofile/${id}`}>
                <p>{Nickname}</p>
            </Link>
            <p className="com">{comment}</p>
        </div>
    )
}
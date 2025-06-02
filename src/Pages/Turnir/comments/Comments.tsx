import { Button, Form, Input } from "antd"
import { useEffect } from "react"
import { addComments, fetchComments } from "../TurnirSlice.ts"
import { useAppDispatch, useAppSelector } from "../../../reduxHooks.ts"

type CommentForm = {
    username: string
    text: string
}

export const TurnirComents = ({ turnirId }: { turnirId: number }) => {
    const comments = useAppSelector(state => state.turnir.comments)
    const user = JSON.parse(localStorage.getItem('user')!)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchComments(turnirId))
    }, [turnirId])

    const handleFinish = (values: CommentForm) => {
        if (user) {
            const date = new Date().toLocaleString()
            dispatch(addComments({ ...values, turnirId, date }))
        }
        else {

        }
    }

    return (
        <div>
            {!user ? <div className="ctext">Гость не может оставлять коментарии</div> : ''}
            <Form onFinish={handleFinish}>
                <Form.Item name="UserName" hidden initialValue={user?.login}></Form.Item>
                <Form.Item name="text">
                    <Input.TextArea className="CommInput" placeholder="comment" />
                </Form.Item>
                <Form.Item>
                    <Button className="CommButonn" type="primary" htmlType="submit" ><img src={require("../../../images/addCom.png")} alt="add" width={35} /></Button>
                </Form.Item>
            </Form>
            <div className="comminus">{comments.map(comment => (
                <div className="comments" key={comment.id}>
                    <h4>{comment.UserName}</h4>
                    <p className="comdate">{comment.date}</p>
                    <p>{comment.text}</p>
                </div>
            ))}</div>
        </div>
    )
}
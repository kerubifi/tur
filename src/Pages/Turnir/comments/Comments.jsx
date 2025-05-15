import { Button, Form, Input } from "antd"
import { useEffect } from "react"
import { addComments, fetchComments } from "../TurnirSlice"
import { useDispatch, useSelector } from "react-redux"

export const TurnirComents = ({ turnirId }) => {
    const comments = useSelector(state => state.turnir.comments)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchComments(turnirId))
    }, [turnirId])

    const handleFinish = (values) => {
        const date = new Date().toLocaleString()
        dispatch(addComments({ ...values, turnirId, date }))
    }

    return (
        <div>
            <Form onFinish={handleFinish}>
                <Form.Item name="UserName">
                    <Input placeholder="name" />
                </Form.Item>
                <Form.Item name="text">
                    <Input.TextArea placeholder="comment" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >add</Button>
                </Form.Item>
            </Form>
            <div>{comments.map(comment => (
                <div key={comment.id}>
                    <span>{comment.UserName}</span>
                    <span>{comment.date}</span>
                    <span>{comment.text}</span>
                </div>
            ))}</div>
        </div>
    )
}
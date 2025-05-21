import { Button, Form, Input, message } from "antd"
import { useAppDispatch } from "../../reduxHooks.ts"
import { Turnirtype } from "../../types/Types.ts"
import { addTurnir } from "../Turnir/TurnirSlice.ts"

export const AddTurnir = () => {
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()

    const handleFinish = (values: Turnirtype) => {
        dispatch(addTurnir(values))
        message.success("Турнир добавлен")
        //form.resetFields()
    }

    return (
        <Form onFinish={handleFinish} layout="vertical" wrapperCol={{ span: 9 }}>
            <Form.Item name='name' label="game" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='category' label="category" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='date' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='time' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='prize' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='groupse' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='peopleInGroupe' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='participants' hidden initialValue={0}>
                <Input />
            </Form.Item>
            <Button htmlType="submit" >add</Button>
        </Form>
    )
}
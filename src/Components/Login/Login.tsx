import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { Registration, LoginUser } from "./LoginSlice.ts"

type UserFormType = {
    login: string
    password: string
    password2: string
    mail: string
}

export const Login = ({ closeModal }: { closeModal: () => void }) => {
    const [Openregistration, setOpenregistration] = useState(false)
    const { user, error } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (user) {
            closeModal()
        }
    }, [user])

    useEffect(() => {
        if (error === "Такой пользователь уже зарегестрирован") {
            setOpenregistration(false)
            form.resetFields()
        }
    }, [error])


    const [form] = Form.useForm()

    const handleFinish = async (values: UserFormType) => {
        if (values.mail) {
            dispatch(Registration(values))
        } else {
            dispatch(LoginUser(values))
        }
    }

    return (
        <div>
            {user ? (
                <>
                    <h2>Вы вошли</h2>
                </>
            ) : (
                <>
                    <Form onFinish={handleFinish}>
                        <h2>{error}</h2>
                        <Form.Item name="login" rules={[{ required: true, min: 5 }]}>
                            <Input placeholder="Login" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, min: 8 }]}>
                            <Input placeholder="Password" />
                        </Form.Item>
                        {Openregistration && (
                            <>
                                <Form.Item name="password2" rules={[{ required: true, min: 8 }]}>
                                    <Input placeholder="Password2" />
                                </Form.Item>
                                <Form.Item name="mail" rules={[{ required: true }]}>
                                    <Input placeholder="mail" />
                                </Form.Item>
                            </>
                        )}
                        <Button htmlType="submit">{Openregistration ? "reg" : "sign"}</Button>
                    </Form>
                    {!Openregistration && <Button onClick={() => { setOpenregistration(true) }} type="primary">reg</Button>}
                </>
            )}
        </div>
    )
}
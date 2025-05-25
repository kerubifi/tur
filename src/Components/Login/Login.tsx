import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { Registration, LoginUser } from "./LoginSlice.ts"

type UserFormType = {
    login: string
    password: string
    mail: string
}

export const Login = ({ closeModal }: { closeModal: () => void }) => {
    const [Openregistration, setOpenregistration] = useState(false)
    const user = JSON.parse(localStorage.getItem('user')!)
    const { error } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

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
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        {Openregistration && (
                            <>
                                <Form.Item name="password2" rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}>
                                    <Input.Password placeholder="Password2" />
                                </Form.Item>
                                <Form.Item name="mail" rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}>
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
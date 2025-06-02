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
    const { error } = useAppSelector((state) => state.userData)
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
                    <Form onFinish={handleFinish} layout="vertical">
                        <h2>{error}</h2>
                        <Form.Item className="LoginInputMargin" name="login" label="Логин" rules={[{ required: true, message: 'Пожалуйста, ввидете логин', }, { min: 5, message: 'Логин должени содержать не менее 5 символов', }]}>
                            <Input className="LoginInput" placeholder="Например: Anton456" />
                        </Form.Item>
                        <Form.Item className="LoginInputMargin" name="password" label="Пароль" rules={[{ required: true, message: 'Пожалуйста, ввидете Пароль', }, { min: 8, message: 'Пароль должени содержать не менее 8 символов', }]}>
                            <Input.Password className="LoginInput" placeholder="Пароль" />
                        </Form.Item>
                        {Openregistration && (
                            <>
                                <Form.Item className="LoginInputMargin" name="password2" label="Подтвердите пароль" rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста, Подтвердите Пароль',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Пароли не совпадают'));
                                        },
                                    }),
                                ]}>
                                    <Input.Password className="LoginInput" placeholder="Подтвердите пароль" />
                                </Form.Item>
                                <Form.Item className="LoginInputMargin" name="mail" label="Электронная почта" rules={[
                                    {
                                        type: 'email',
                                        message: 'Пожалуйста, ввидете адрес электронной почты',
                                    },
                                    {
                                        required: true,
                                    },
                                ]}>
                                    <Input className="LoginInput" placeholder="Например: 123@mail.ru" />
                                </Form.Item>
                            </>
                        )}
                        <div className="LogButtons">
                            <Button className="LoginButton" htmlType="submit">{Openregistration ? "Зарегестрироватся" : "Вход"}</Button>
                            {!Openregistration && <><span className="lt"> | </span><Button className="RegButton" onClick={() => { setOpenregistration(true) }} type="primary">Регистрация</Button></>}
                        </div>
                    </Form>
                </>
            )}
        </div>
    )
}
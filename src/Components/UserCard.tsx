import { Link } from 'react-router-dom'
import { memo, use, useState } from 'react'
import { UserDataType } from '../types/Types.ts'
import { Button, Form, Input, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../reduxHooks.ts'
import { ChangeUser, ChangeUserProfile, fetchUsersProfile } from '../Pages/Admin/admin.ts'

type Props = {
    user: UserDataType
}

export const UserCard = memo(({ user }: Props) => {
    let userProfile = useAppSelector((state) => state.users.userProfile)
    const [change, setchange] = useState(0)
    const [modal, setmodal] = useState(false)
    const dispatch = useAppDispatch()

    const closeModal = () => {
        setmodal(false)
    }

    const handleChangeUser = (values: UserDataType) => {
        let newuser
        let newprofile
        switch (change) {
            case 1:
                newuser = { ...user, login: values.login }
                dispatch(fetchUsersProfile(user))
                newprofile = { ...user, login: values.login }
                dispatch(ChangeUserProfile(newprofile))
                break;
            case 2:
                newuser = { ...user, password: values.password }
                break;
            case 3:
                newuser = { ...user, mail: values.mail }
                break;
            case 4:
                newuser = { ...user, role: values.role }
                dispatch(fetchUsersProfile(user))
                newprofile = { ...userProfile, role: values.role }
                dispatch(ChangeUserProfile(newprofile))
                break;
            default:
                break;
        }
        dispatch(ChangeUser(newuser))
        form.resetFields()
    }

    const [form] = Form.useForm()

    const { id, login, password, mail, role } = user
    return (
        <div className='cards'>
            <Link className='link' to={`/userprofile/${id}`}>
                <div>Логин: {login}</div>
            </Link>
            <button onClick={() => (setchange(1), setmodal(true))}>login</button>
            <Link className='link' to={`/userprofile/${id}`}>
                <div>Пароль: {password}</div>
            </Link>
            <button onClick={() => (setchange(2), setmodal(true))}>password</button>
            <Link className='link' to={`/userprofile/${id}`}>
                <div>Mail: {mail}</div>
            </Link>
            <button onClick={() => (setchange(3), setmodal(true))}>mail</button>
            <Link className='link' to={`/userprofile/${id}`}>
                <div>role: {role}</div>
            </Link>
            {role ? <button onClick={() => (setchange(4), setmodal(true))}>role</button> : ''}
            <Modal destroyOnHidden footer={null} onCancel={closeModal} open={modal}>
                <Form onFinish={handleChangeUser}>
                    <Form.Item name='login' label="login" hidden={change !== 1} >
                        <Input />
                    </Form.Item>
                    <Form.Item name='password' label="password" hidden={change !== 2} >
                        <Input />
                    </Form.Item>
                    <Form.Item name='mail' label="mail" hidden={change !== 3} >
                        <Input />
                    </Form.Item>
                    <Form.Item name='role' label="role" hidden={change !== 4} >
                        <Input />
                    </Form.Item>
                    <Button htmlType="submit" >add</Button>
                </Form>
            </Modal>
        </div>
    )
})

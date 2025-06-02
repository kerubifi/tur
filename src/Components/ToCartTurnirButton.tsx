import { useAppDispatch, useAppSelector } from "../reduxHooks.ts"
import { ParticipantsType, Turnirtype } from "../types/Types.ts"
import { ChangeUser } from '../Pages/Profile/ProfileSlice.ts'
import { Button, Form, Input, Modal } from "antd"
import { useState } from "react"
import TextArea from "antd/es/input/TextArea"
import { ChangeParticipants } from "../Pages/Turnir/TurnirSlice.ts"

export const ToCartTurnirButton = ({ turnir }: { turnir: Turnirtype }) => {
    const [OpenModal, setOpenModal] = useState(false)
    const [variants, setvariants] = useState(false)
    const user = JSON.parse(localStorage.getItem('user')!)
    const s = useAppSelector((state) => state.userProfile.userProfile)//!!!
    const dispatch = useAppDispatch()

    const cartTurnirsIds = user?.cartTurnirs!.map(i => i.id)

    const closeModal = () => {
        setOpenModal(false)
    }


    const ChangeCartTurnirs = async (values: ParticipantsType) => {
        if (user) {
            if (user?.cartTurnirs?.some(el => el.id === turnir.id)) {
                const p = turnir.participants!.filter(e => e.id !== user.id)
                const newParticipants = { ...turnir, participants: p }
                dispatch(ChangeParticipants(newParticipants))
                const t = user.cartTurnirs.filter(e => e.id !== turnir.id)
                const newUserData = { ...user, cartTurnirs: t }
                dispatch(ChangeUser(newUserData))
            }
            else {
                values.login = user.login
                values.id = user.id
                let p = [values]
                turnir.participants!.map(x => p = [...p, x])
                const newParticipants = { ...turnir, participants: p }
                console.log(newParticipants)
                dispatch(ChangeParticipants(newParticipants))
                let t = [turnir]
                user?.cartTurnirs?.map(x => t = [...t, x])
                const newUserData = { ...user, cartTurnirs: t }
                dispatch(ChangeUser(newUserData))
            }
            setOpenModal(false)
            form.resetFields()
        }
    }
    const [form] = Form.useForm()

    const Modals = () => {
        if (user?.cartTurnirs?.some(el => el.id === turnir.id)) {
            setvariants(true)
        } else { setvariants(false) }
        setOpenModal(true)
    }

    return (
        <div className="CartIcon">
            {cartTurnirsIds && <button onClick={() => Modals()} className={cartTurnirsIds && cartTurnirsIds.includes(turnir.id) ? 'activeCart' : 'noactiveCart'}>Участвовать</button>}
            <Modal destroyOnHidden footer={null} onCancel={closeModal} open={OpenModal}>
                <Form onFinish={ChangeCartTurnirs}>
                    <Form.Item name='Nickname' label="Ник в игре" hidden={variants} rules={!variants ? [{ required: true }] : []} >
                        <Input placeholder="Например: Amton456" />
                    </Form.Item>
                    <Form.Item name='comment' label="Коментарий" hidden={variants}>
                        <TextArea rows={2} placeholder="Комментарий" />
                    </Form.Item>
                    {variants ? <span className="exityes">Вы точно хотите отменить участие?</span> : ""}
                    {variants ? <Button className="JoinButton" htmlType="submit" >Да</Button> : <Button className="JoinButton" htmlType="submit" >Присоединиться</Button>}
                </Form>
            </Modal>
        </div>
    )
}
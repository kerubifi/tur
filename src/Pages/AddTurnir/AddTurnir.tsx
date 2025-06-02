import { Button, DatePicker, Form, Input, message, Modal, Select } from "antd"
import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { Turnirtype } from "../../types/Types.ts"
import { addTurnir, fetchGames } from "../Turnir/TurnirSlice.ts"
import { useEffect, useState } from "react"
import TextArea from "antd/es/input/TextArea"
import { Card } from "../../Components/Card.tsx"
import { ChangeUser } from "../Profile/ProfileSlice.ts"
import { useNavigate } from "react-router-dom"
import { Changeturnirkol } from "../Main/TurnirsSlice.ts"

export const AddTurnir = () => {
    const [modal, setModal] = useState(false)
    const dispatch = useAppDispatch()
    const t = useAppSelector((state) => state.userProfile.userProfile)
    const games = useAppSelector((state) => state.turnir.games)
    const user = JSON.parse(localStorage.getItem('user')!)

    useEffect(() => {
        dispatch(fetchGames())
    }, [])

    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])


    const closeModal = () => {
        setModal(false)
    }

    const handleFinish = (values: Turnirtype) => {
        values.date = values.date.toString()
        values.creator = user!.login
        values.participants = []
        dispatch(addTurnir(values))
        dispatch(Changeturnirkol())
        let t = [values]
        user?.userTurnir?.map(x => t = [...t, x])
        const newUserData = { ...user, userTurnir: t }
        console.log(newUserData)
        dispatch(ChangeUser(newUserData))
    }
    if (user) {
        return (
            <div className="AddTurnir">
                <div className="cardsbox">
                    <div onClick={() => setModal(true)} className="addtur"><img src={require("../../images/add.png")} alt='add' width={50} /></div>
                    {user.userTurnir.map((turnir) => (
                        <Card
                            key={turnir.id}
                            turnir={turnir} />
                    ))}

                </div>
                <Modal destroyOnHidden footer={null} onCancel={closeModal} open={modal}>
                    <Form onFinish={handleFinish} layout="vertical" wrapperCol={{ span: 9 }}>
                        <Form.Item name='game' label="game" rules={[{ required: true }]}>
                            <Select options={games.map((e) => ({ label: e.game, value: e.game }))} />
                        </Form.Item>
                        <Form.Item name='date' label="date" rules={[{ required: true }]}>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                        </Form.Item>
                        <Form.Item name='prize' label="prize" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='groupse' label="groupse" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='peopleInGroupe' label="peopleInGroupe" rules={[
                            {
                                required: true,
                                type: 'enum',
                                enum: ['1', '2', '3', '4', '5']
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    let max: number = 1
                                    games.map((e) => {
                                        if (e.game === getFieldValue('game')) {
                                            max = e.maxpeopleInGroupe
                                        }
                                    })
                                    if (!value || max >= value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('no'));
                                },
                            }),
                        ]} >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name='comment' label="comment">
                            <TextArea rows={2} />
                        </Form.Item>
                        <Button htmlType="submit" >add</Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}
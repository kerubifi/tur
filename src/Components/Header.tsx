import logo from '../images/Logo.svg'
import filter from '../images/Menu.svg'
import { Link } from 'react-router-dom'
import { Filter } from './Filter.tsx'
import { memo, useState } from 'react'
import { Drawer, Input, Modal } from 'antd'
import { debounce } from 'lodash'
import './header.css'
import { SearchParamsType } from '../types/Types.ts'
import { Login } from './Login/Login.tsx'
import { useAppSelector } from '../reduxHooks.ts'

export const Header = memo(({ searchParams, handleChangeFilters }: SearchParamsType) => {
    const [OpenModal, setOpenModal] = useState(false)
    const [OpenMenu, setOpenMenu] = useState(false)
    const user = JSON.parse(localStorage.getItem('user')!)
    const s = useAppSelector((state) => state.userProfile.userProfile)//!!!
    const debouncedHandler = debounce(((event: React.ChangeEvent<HTMLInputElement>) => handleChangeFilters('q', event.target.value)), 500)
    const [openFilter, setOpenFilter] = useState(false)

    const closeModal = () => {
        setOpenModal(false)
    }

    const handleOpen = () => {
        setOpenFilter(!openFilter)
    }
    const fav = user?.favorite!.reduce((acc: number) => acc + 1, 0)
    const car = user?.cartTurnirs!.reduce((acc: number) => acc + 1, 0)
    return (
        <>
            <Drawer className='FilterDrawer' open={openFilter} placement='left' onClose={() => setOpenFilter(false)} width={270}>
                <Filter handleChangeFilters={handleChangeFilters} searchParams={searchParams} />
            </Drawer >
            <div className='header'>
                <Link to="/">
                    <div>
                        <img src={logo} alt="logo" width={80} />
                    </div>
                </Link><div className='InputFlex'>
                    <div className='filtermenu'>
                        {searchParams.get('game') || searchParams.get('_order') ? <div className='filternum' /> : ''}
                        <div onClick={handleOpen}>
                            <img src={filter} alt="filter" width={20} />
                        </div>
                    </div>
                    <Input placeholder='Поиск' className='HeaderInput' onChange={debouncedHandler} defaultValue={searchParams.get('name') || ''} />
                </div>
                <div className='HeaderRight'>
                    <div className='HeaderButton'>
                        <Link className='headeartextbutton' to="cartturnirs">
                            <div>Турниры</div>
                            {car > 0 && <div className='iconquantity'>{car}</div>}
                        </Link>
                        <div>|</div>
                        <Link className='headeartextbutton' to="/favorite">
                            <div>Избраное</div>
                            {fav > 0 && <div className='iconquantity'>{fav}</div>}
                        </Link>
                    </div>
                    {user ? <img className='ProfileButton' onClick={() => setOpenMenu(!OpenMenu)} src={require('../images/iconAvatar.png')} alt='Avatar' width={30} /> :
                        <button className='SignIn' onClick={() => setOpenModal(true)}>Вход</button>}
                </div>
                <Modal destroyOnHidden footer={null} onCancel={closeModal} open={OpenModal}><Login closeModal={closeModal} /></Modal>
                <Drawer className='UserDrawer' width={180} open={OpenMenu} placement='right' onClose={() => setOpenMenu(false)}>
                    <Link to="/addturnir">
                        <div>Мои турниры</div>
                    </Link>
                    {user ? <Link to={`/userprofile/${user.id}`}>
                        <div>Профиль</div>
                    </Link> : ''}
                    {user && user.role ? <Link to="/admin"><div>admin</div></Link> : ""}
                    <div onClick={() => { localStorage.removeItem('user'); window.location.reload() }}>Выход</div>
                </Drawer >

            </div>
        </>
    )
})
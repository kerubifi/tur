import logo from '../images/openfaas-dark.svg'
import filter from '../images/iconfilter.png'
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
            <Drawer open={openFilter} placement='left' onClose={() => setOpenFilter(false)}>
                <Filter handleChangeFilters={handleChangeFilters} searchParams={searchParams} />
            </Drawer >
            <div className='header'>
                <Link to="/">
                    <div>
                        <img src={logo} alt="logo" width={30} />
                    </div>
                </Link>
                <div className='filtermenu'>
                    {searchParams.get('game') || searchParams.get('_order') ? <div className='filternum' /> : ''}

                    <button onClick={handleOpen}>
                        <img src={filter} alt="filter" width={20} />
                    </button>
                </div>
                <Input onChange={debouncedHandler} defaultValue={searchParams.get('name') || ''} />
                <Link to="cartturnirs">
                    <button>tur</button>
                    {car && <div className='iconquantity'>{car}</div>}
                </Link>
                <Link to="/favorite">
                    <div><img src={require('../images/iconStar.png')} alt='izbranoe' width={25} /></div>
                    {fav && <div className='iconquantity'>{fav}</div>}
                </Link>
                <div onClick={!user ? () => setOpenModal(true) : () => setOpenMenu(!OpenMenu)}><img src={require('../images/user.png')} alt='izbranoe' width={25} /></div>
                <Modal destroyOnHidden footer={null} onCancel={closeModal} open={OpenModal}><Login closeModal={closeModal} /></Modal>
                <Drawer width={180} open={OpenMenu} placement='right' onClose={() => setOpenMenu(false)}>
                    <Link to="/addturnir">
                        <span>+</span>
                    </Link>
                    <span onClick={() => { localStorage.removeItem('user'); window.location.reload() }}>exit</span>
                    <Link to={`/userprofile/${user.id}`}>
                        <span>profil</span>
                    </Link>
                    {user && user.role ? <Link to="/admin"><span>admin</span></Link> : ""}
                    {/* <span onClick={() => console.log(JSON.parse(localStorage.getItem('user')!))}>ok</span> */}
                </Drawer >

            </div>
        </>
    )
})
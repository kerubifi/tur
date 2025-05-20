import logo from '../images/openfaas-dark.svg'
import filter from '../images/iconfilter.png'
import { Link } from 'react-router-dom'
import { Filter } from './Filter.tsx'
import { memo, useState } from 'react'
import { Drawer, Input } from 'antd'
import { debounce } from 'lodash'
import './header.css'
import { useAppSelector } from '../reduxHooks.ts'

type Props = {
    handleChangeFilters: (a: string, b: string) => void
    searchParams: URLSearchParams
}

export const Header = memo(({ searchParams, handleChangeFilters }: Props) => {
    const favorite = useAppSelector((state) => state.favorite.favorite)
    const { cartTurnirs } = useAppSelector((state) => state.cartTurnirs)

    const debouncedHandler = debounce((event => handleChangeFilters('q', event.target.value)), 500)
    const [openFilter, setOpenFilter] = useState(false)
    const handleOpen = () => {
        setOpenFilter(!openFilter)
    }

    const fav = favorite.reduce((acc) => acc + 1, 0)
    const car = cartTurnirs.reduce((acc) => acc + 1, 0)

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
                    {searchParams.get('category') && <div className='filternum' />}
                    <button onClick={handleOpen}>
                        <img src={filter} alt="filter" width={20} />
                    </button>
                </div>
                <Input onChange={debouncedHandler} defaultValue={searchParams.get('q') || ''} />
                <Link to="cartturnirs">
                    <button>tur</button>
                    {car && <div className='iconquantity'>{car}</div>}
                </Link>
                <Link to="/favorite">
                    <div><img src={require('../images/iconStar.png')} alt='izbranoe' width={25} /></div>
                    {fav && <div className='iconquantity'>{fav}</div>}
                </Link>
            </div>
        </>
    )
})
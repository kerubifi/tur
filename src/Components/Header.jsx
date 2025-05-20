import logo from '../images/openfaas-dark.svg'
import filter from '../images/iconfilter.png'
import { Link } from 'react-router-dom'
import { Filter } from './Filter'
import { memo, useState } from 'react'
import { Drawer, Input } from 'antd'
import { debounce } from 'lodash'

export const Header = memo(({ searchParams, handleChangeFilters }) => {
    const debouncedHandler = debounce((event => handleChangeFilters('q', event.target.value)), 500)
    const [openFilter, setOpenFilter] = useState(false)
    const handleOpen = () => {
        setOpenFilter(!openFilter)
    }


    return (
        <>
            <Drawer open={openFilter} placement='left' onClose={()=> setOpenFilter(false)}>
                <Filter handleChangeFilters={handleChangeFilters} searchParams={searchParams} />
            </Drawer >
            <div className='header'>
                <Link to="/">
                    <div>
                        <img src={logo} alt="logo" width={30} />
                    </div>
                </Link>
                <button onClick={handleOpen}>
                    <img src={filter} alt="filter" width={20} />
                </button>
                <Input onChange={debouncedHandler} defaultValue={searchParams.get('q') || ''}  />
                <Link to="cartturnirs">
                    <button>tur</button>
                </Link>
                <Link to="/favorite">
                    <div><img src={require('../images/iconStar.png')} alt='izbranoe' width={25} /></div>
                </Link>
            </div>
        </>
    )
})
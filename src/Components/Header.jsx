import logo from '../images/openfaas-dark.svg'
import filter from '../images/iconfilter.png'
import { Link } from 'react-router-dom'
import { Filter } from './Filter'
import { useState } from 'react'

export const Header = ({ handleInput, handleChandeCategory, category }) => {
    const [openFilter, setOpenFilter] = useState(false)

    const handleOpen = () => {
        setOpenFilter(!openFilter)
    }


    return (
        <>
            {openFilter && <Filter handleChandeCategory={handleChandeCategory} category={category} />}
            <div className='header'>
                <Link to="/">
                    <div>
                        <img src={logo} alt="logo" width={30} />
                    </div>
                </Link>
                <button onClick={handleOpen}>
                    <img src={filter} alt="filter" width={20} />
                </button>
                <input onChange={(event => handleInput(event.target.value))} />
                <Link to="cartturnirs">
                    <button>tur</button>
                </Link>
                <Link to="/favorite">
                    <div><img src={require('../images/iconStar.png')} alt='izbranoe' width={25} /></div>
                </Link>
            </div>
        </>
    )
}
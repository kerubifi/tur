import logo from '../images/openfaas-dark.svg'
import filter from '../images/iconfilter.png'
import { Link } from 'react-router-dom'

export const Header = ({ handleInput, handleOpen }) => {
    return (
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
            <Link to="/favorite">
                <div><img src={require('../images/iconStar.png')} alt='izbranoe' width={25} /></div>
            </Link>
        </div>
    )
}
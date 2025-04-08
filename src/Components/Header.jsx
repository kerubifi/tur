import logo from '../images/openfaas-dark.svg'
import filter from '../images/iconfilter.png'

export const Header = ({ handleInput, handleOpen }) => {
    return (
        <div className='header'>
            <div>
                <img src={logo} alt="logo" width={30} />
            </div>
            <button onClick={handleOpen}>
                <img src={filter} alt="filter" width={20} />
            </button>
            <input onChange={(event => handleInput(event.target.value))} />
            <div>header</div>
        </div>
    )
}
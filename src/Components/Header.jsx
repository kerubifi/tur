import logo from '../images/openfaas-dark.svg'

export const Header = ({handleInput}) => {
    return (
        <div className='header'>
            <div>
                <img src={logo} alt="logo" width={30} />
            </div>
            <input onChange={(event => handleInput(event.target.value))} />
            <div>header</div>
        </div>
    )
}
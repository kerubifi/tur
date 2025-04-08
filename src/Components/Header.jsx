import logo from '../images/openfaas-dark.svg'

export const Header = () => {
    return (
        <div className='header'>
            <div>
                <img src={logo} alt="logo" width={30} />
            </div>
            <div>header</div>
        </div>
    )
}
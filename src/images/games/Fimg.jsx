import Valorant from './valorant.jpg'
import CSGO from './csgo.png'
import LoL from './lol.jpg'
import Dota2 from './dota.jpg'

export const Fimg = ({ game }) => {
    let sr
    switch (game) {
        case 'Valorant':
            sr = Valorant
            break;
        case 'CS-GO':
            sr = CSGO
            break;
        case 'LoL':
            sr = LoL
            break;
        case 'Dota2':
            sr = Dota2
            break;

        default:
            break;
    }
    return (
        <img src={sr} alt={game} width={30} />
    )
}
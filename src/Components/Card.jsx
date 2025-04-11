export const Card = ({ ChangeFavourites, favourites, id, name, prize, img, alt }) => {
    return(
        <div className='cards'>
            <div className='izflex'>
                <div><img src={img} alt={alt} width={30} /></div>
                <div ><img onClick={() => ChangeFavourites(id)} src={favourites.includes(id) ? require('../images/iconStar.png') : require('../images/iconEmptyStar.png')} alt='izbranoe' width={10} /></div>
            </div>
            <div>{name}</div>
            <div>Приз: {prize}</div>
        </div>
)}
export const Card = ({ ChangeFavourites, favoriteIds, turnir }) => {
    const { img, alt, id, name, prize} = turnir
    return (
        <div className='cards'>
            <div className='izflex'>
                <div><img src={img} alt={alt} width={30} /></div>
                 {favoriteIds && <div ><img onClick={() => ChangeFavourites(turnir)} src={favoriteIds.includes(id) ? require('../images/iconStar.png') : require('../images/iconEmptyStar.png')} alt='izbranoe' width={10} /></div>}
            </div>
            <div>{name}</div>
            <div>Приз: {prize}</div>
        </div>
    )
}
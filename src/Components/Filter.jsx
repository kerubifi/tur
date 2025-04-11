export const Filter = ({handleChandeCategory, category}) => {
    return (<div className='filter'>
        <div onClick={() => handleChandeCategory('1-person-shooter')} className={category === '1-person-shooter' && 'active'}>Шутер от 1 лица</div>
        <div onClick={() => handleChandeCategory('moba')} className={category === 'moba' && 'active'}>Моба</div>
    </div>)
}

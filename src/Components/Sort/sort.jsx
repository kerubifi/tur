import './sort.css'

export const Sort = ({handleChangeSort, sort}) => {
    return (
        <div className="sort">
            <span>Сортировка по участникам:</span>
            <span onClick={()=> handleChangeSort('desc')} className={sort === 'desc' && 'active'}>По возростанию</span>
            <span onClick={()=> handleChangeSort('asc')} className={sort === 'asc' && 'active'}>По убыванию</span>
        </div>
    )
}
import './sort.css'

export const Sort = ({handleChangeFilters, searchParams}) => {
    return (
        <div className="sort">
            <span>Сортировка по участникам:</span>
            <span onClick={()=> handleChangeFilters('_order', 'desc')} className={searchParams.get('_order') === 'desc' ? 'active' : ''}>По возростанию</span>
            <span onClick={()=> handleChangeFilters('_order', 'asc')} className={searchParams.get('_order') === 'asc' ? 'active' : ''}>По убыванию</span>
        </div>
    )
}
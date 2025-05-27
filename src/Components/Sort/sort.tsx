import { SearchParamsType } from '../../types/Types.ts'
import './sort.css'

export const Sort = ({ handleChangeFilters, searchParams }: SearchParamsType) => {
    return (
        <div className="sort">
            <div>Сортировка по участникам:</div>
            <span onClick={() => handleChangeFilters('_order', 'desc')} className={searchParams.get('_order') === 'desc' ? 'sortactive' : ''}>По возростанию</span>
            <span>|</span>
            <span onClick={() => handleChangeFilters('_order', 'asc')} className={searchParams.get('_order') === 'asc' ? 'sortactive' : ''}>По убыванию</span>
        </div>
    )
}
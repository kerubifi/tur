import { SearchParamsType } from "../types/Types.ts"

export const Filter = ({ handleChangeFilters, searchParams }: SearchParamsType) => {
    return (<div className='filter'>
        <div onClick={() => handleChangeFilters('category', '1-person-shooter')} className={searchParams.get('category') === '1-person-shooter' ? 'active' : ''}>Шутер от 1 лица</div>
        <div onClick={() => handleChangeFilters('category', 'moba')} className={searchParams.get('category') === 'moba' ? 'active' : ''}>Моба</div>
    </div>)
}

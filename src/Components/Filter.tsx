import { SearchParamsType } from "../types/Types.ts"

export const Filter = ({ handleChangeFilters, searchParams }: SearchParamsType) => {
    return (<div className='filter'>
        <div onClick={() => handleChangeFilters('q', 'shooter')} className={searchParams.get('q') === 'shooter' ? 'active' : ''}>Шутер</div>
        <div onClick={() => handleChangeFilters('q', '1-person-shooter')} className={searchParams.get('q') === '1-person-shooter' ? 'active' : ''}>Шутер от 1 лица</div>
        <div onClick={() => handleChangeFilters('q', 'moba')} className={searchParams.get('q') === 'moba' ? 'active' : ''}>Моба</div>
    </div>)
}

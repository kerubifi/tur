import { useEffect } from "react"
import { SearchParamsType } from "../types/Types.ts"
import { useAppDispatch, useAppSelector } from "../reduxHooks.ts"
import { fetchGames } from "../Pages/Turnir/TurnirSlice.ts"
import { FilterCard } from "./FilterCard.tsx"
import { Sort } from "./Sort/sort.tsx"

export const Filter = ({ handleChangeFilters, searchParams }: SearchParamsType) => {
    const dispatch = useAppDispatch()
    const games = useAppSelector((state) => state.turnir.games)

    useEffect(() => {
        dispatch(fetchGames())
    }, [])

    return (<div className='filter'>
        <Sort handleChangeFilters={handleChangeFilters} searchParams={searchParams} />
        {games.map((e) => (
            <FilterCard
                key={e.id}
                handleChangeFilters={handleChangeFilters}
                searchParams={searchParams}
                game={e} />
        ))}

    </div>)
}

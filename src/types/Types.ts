export type Turnirtype = {
    id?: number
    name: string
    category: string
    prize: number
    groupse: number
    peopleInGroupe: number
    participants: number
    date: string
    time: string
}

export type SearchParamsType = {
    handleChangeFilters: (a: string, b: string) => void
    searchParams: URLSearchParams
}
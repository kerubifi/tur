export type Turnirtype = {
    id: number
    name: string
    prize: number
    groupse: number
    peopleInGroupe: number
    participants: number
}

export type SearchParamsType = {
    handleChangeFilters: (a: string, b: string) => void
    searchParams: URLSearchParams
}
export type Turnirtype = {
      game: string
      date: string
      prize: string
      groupse: number
      peopleInGroupe: number
      participants: number
      creator: string
      id?: number
}

export type UserType = {
    login: string
    password: string
    mail?: string
    favorite?: Turnirtype[]
    cartTurnirs?: Turnirtype[]
    turnirs?: Turnirtype[]
    userTurnir?: Turnirtype[]
    role?: number
    id?: number
}

export type SearchParamsType = {
    handleChangeFilters: (a: string, b: string) => void
    searchParams: URLSearchParams
}
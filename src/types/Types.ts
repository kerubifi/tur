export type Turnirtype = {
    game: string
    date: string
    prize: string
    groupse: number
    peopleInGroupe: number
    participants?: ParticipantsType[]
    creator: string
    comment?: string
    id?: number
}

export type UserDataType = {
    login: string
    password: string
    mail?: string
    id?: number
    role?: number
}

export type UserType = {
    login: string
    password: string
    mail?: string
    favorite?: Turnirtype[]
    cartTurnirs?: Turnirtype[]
    userTurnir?: Turnirtype[]
    role?: number
    id?: number
}

export type UserProfileType={
    login: string
    favorite?: Turnirtype[]
    cartTurnirs?: Turnirtype[]
    userTurnir?: Turnirtype[]
    role?: number
    id?: number
}

export type SearchParamsType = {
    handleChangeFilters: (a: string, b: string) => void
    searchParams: URLSearchParams
}

export type ParticipantsType={
    Nickname: string
    login: string
    Comment?: string
    id?: number
}
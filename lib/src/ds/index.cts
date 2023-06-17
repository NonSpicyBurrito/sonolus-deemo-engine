export type DS = {
    notes: DSNote[]
    links: DSLink[]
}

export type DSNote = {
    $id: string
    pos: number
    size: number
    _time: number
}

export type DSLink = {
    notes: {
        $ref: string
    }[]
}

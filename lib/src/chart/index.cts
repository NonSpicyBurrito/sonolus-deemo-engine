export type Chart = {
    notes: Note[]
    links: Link[]
}

export type Note = {
    $id: string
    pos: number
    size: number
    time: number
}

export type Link = {
    notes: {
        $ref: string
    }[]
}

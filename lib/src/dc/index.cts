export type DC = DCObject[]

export type DCObject = DCBpmChangeObject | DCTapNote | DCSlideNote

type BaseDCObject = {
    beat: number
}

export type DCBpmChangeObject = BaseDCObject & {
    type: 'bpm'
    bpm: number
}

type BaseDCNote = BaseDCObject & {
    lane: number
    size: number
}

export type DCTapNote = BaseDCNote & {
    type: 'tap'
}

export type DCSlideNote = BaseDCNote & {
    type: 'slide'
}

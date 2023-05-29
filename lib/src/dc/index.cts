export type DC = ChartObject[]

export type ChartObject = BPMObject | TapNote | SlideNote

type ObjectBase = {
    beat: number
}

export type BPMObject = ObjectBase & {
    type: 'bpm'
    bpm: number
}

type NoteBase = ObjectBase & {
    lane: number
    size: number
}

export type TapNote = NoteBase & {
    type: 'tap'
}

export type SlideNote = NoteBase & {
    type: 'slide'
}

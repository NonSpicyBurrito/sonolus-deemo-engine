import { Initialization } from './Initialization.mjs'
import { Stage } from './Stage.mjs'
import { SlideNote } from './notes/SlideNote.mjs'
import { TapNote } from './notes/TapNote.mjs'

export const archetypes = defineArchetypes({
    Initialization,

    Stage,

    TapNote,
    SlideNote,
})

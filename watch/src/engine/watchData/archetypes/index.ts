import { Initialization } from './Initialization.js'
import { SlideNote } from './notes/SlideNote.js'
import { TapNote } from './notes/TapNote.js'
import { Stage } from './Stage.js'

export const archetypes = defineArchetypes({
    Initialization,

    Stage,

    TapNote,
    SlideNote,
})

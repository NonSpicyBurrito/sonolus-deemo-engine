import { Initialization } from './Initialization.js'
import { InputManager } from './InputManager.js'
import { Stage } from './Stage.js'
import { SlideNote } from './notes/SlideNote.js'
import { TapNote } from './notes/TapNote.js'

export const archetypes = defineArchetypes({
    Initialization,
    InputManager,

    Stage,

    TapNote,
    SlideNote,
})
